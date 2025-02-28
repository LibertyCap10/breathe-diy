<script>
    import Icon from "@iconify/svelte";
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    import { onMount } from 'svelte';
    import BarChart from './BarChart.svelte';
    import LineChart from './LineChart.svelte';
    import logo from '$lib/assets/breathe-logo-transparent.png';
    import Drawer from './Drawer.svelte';

    import {page} from '$app/state';
    
    // import type { PageData } from './$types';

    let { data: data } = $props();
        
    let version = data.version;

    // import { isMobile } from '$lib/stores/screen';

    // export let data;
    
    // let { version } = $props();
        // let open = false;

    // let menuOpen = false;
    let lastTap = 0;
    let chartCanvas;
    let modalChartCanvas;

    const state = $state({
        phase: 'idle', // 'deep-breathing', 'exhale-hold', 'inhale-hold'
        round: 1,
        breathCount: 0,
        deepBreathing: 0,
        deepBreathingTime: 1, // 30 breaths * 1.6s each
        exhaleHoldTime: 0,
        inhaleHoldTime: 15,
        results: [],
        timer: null,
        interval: null,
        showResultsOverlay: false,
        drawerIsOpen: false
    });



    const openDrawer = () => {
        state.drawerIsOpen = true; 
        console.log("clicked!")
        console.log(state.drawerIsOpen);
    };

    const clearTimers = () => {
        clearTimeout(state.timer);
        clearInterval(state.interval);
    };

    const resetSession = () => {
        clearTimers();
        state.phase = 'idle';
        state.breathCount = 0;
        state.deepBreathingTime = 0;
        state.results = [];
        state.round = 1;
        state.showResultsOverlay = false;

        // Reset the chart
        resetChart(chartCanvas);
        resetChart(modalChartCanvas);
    };

    const startSession = () => {
        clearTimers();
        state.phase = 'deep-breathing';
        state.breathCount = 0;
        state.deepBreathingTime = 0;
        state.results = [];
        state.round = 1;
        state.showResultsOverlay = false;

        // Reset the chart
        resetChart(chartCanvas);
        resetChart(modalChartCanvas);

        nextBreath();
    };

    const resetChart = (canvas) => {
        if (!canvas) return;
        const chart = Chart.getChart(canvas);
        if (chart) {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.update();
        }
    };

    const beginNextRound = () => {
        clearTimers();
        state.phase = 'deep-breathing';
        state.breathCount = 0;
        state.deepBreathingTime = 0;
        state.showResultsOverlay = false;
        nextBreath();
    };

    const nextBreath = () => {
        if (state.breathCount < 30) {
            state.breathCount++;
            state.deepBreathingTime += 4;
            state.timer = setTimeout(nextBreath, 4500);
        } else {
            startExhaleHold();
        }
    };

    const startExhaleHold = () => {
        clearTimers();
        state.phase = 'exhale-hold';
        state.exhaleHoldTime = 0;
        state.interval = setInterval(() => state.exhaleHoldTime++, 1000);
    };

    const startInhaleHold = () => {
        clearTimers();
        state.phase = 'inhale-hold';
        state.inhaleHoldTime = 15;
        state.interval = setInterval(() => {
            if (state.inhaleHoldTime > 0) {
                state.inhaleHoldTime--;
            } else {
                clearInterval(state.interval);
                endInhaleHold();
            }
        }, 1000);
    };

    const endInhaleHold = () => {
        clearTimers();
        state.results = [...state.results, {
            round: state.round,
            breathCount: state.breathCount,
            exhaleHold: state.exhaleHoldTime,
            inhaleHold: state.inhaleHoldTime,
        }];
        state.round++;
        updateChart(chartCanvas);
        updateChart(modalChartCanvas);
        beginNextRound();
    };

    const handleTap = () => {
        const now = new Date().getTime();
        if (now - lastTap < 300) {
            stopSession(); // Double-tap detected
        }
        lastTap = now;

        if (state.phase === 'deep-breathing') {
            startExhaleHold();
            return;
        }

        if (state.phase === 'exhale-hold') {
            startInhaleHold();
            return;
        }

        if (state.phase === 'inhale-hold') {
            endInhaleHold();
            return;
        }
    };

    const stopSession = () => {
        clearTimers();
        state.phase = 'idle';
        state.showResultsOverlay = true;
    };

    onMount(() => {
        initializeChart(chartCanvas);
        initializeChart(modalChartCanvas);
    });

    const initializeChart = (canvas) => {
        if (!canvas) return;
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Exhale Hold (s)',
                        data: [],
                        borderColor: 'yellow',
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };

    const updateChart = (canvas) => {
        if (!canvas) return;
        const chart = Chart.getChart(canvas);
        if (chart) {
            chart.data.labels = state.results.map(r => `Round ${r.round}`);
            chart.data.datasets[0].data = state.results.map(r => r.exhaleHold);
            chart.update();
        }
    };


</script>


<nav class="flex w-full py-3 px-6 flex items-center justify-between bg-gray-900 ">
    <!-- Logo on the left -->
    <button onclick={resetSession}><img src={logo} alt="Logo" class="h-14" /></button>

    <p class="text-lg font-bold text-white pl-4">Round: {state.round}</p>

    <!-- Menu button -->
    <a 
        class="text-white focus:outline-none" 
        aria-label="Open menu"
        onclick={openDrawer}
        href="/"
    >
        <Drawer open={state.drawerIsOpen} results={state.results} class="backdrop-blur-lg"></Drawer>
    </a>

</nav>


<div class="flex flex-col items-center justify-center bg-gray-900 text-white p-2 mt-6">
    <div class="flex space-x-0 mb-8">
        <div class={`px-2 py-2 rounded-sm text-sm ${state.phase === 'deep-breathing' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>Deep Breathing</div>

        <Icon icon="tabler:arrow-badge-right" width="24" height="24" class="pt-2"/>

        <div class={`px-2 py-2 rounded-sm text-sm ${state.phase === 'exhale-hold' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>Exhale Hold</div>

        <Icon icon="tabler:arrow-badge-right" width="24" height="24" class="pt-2" />
        
        <div class={`px-2 py-2 rounded-sm text-sm ${state.phase === 'inhale-hold' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>Inhale Hold</div>
    </div>

    <div class="flex mb-18 ml-7 lg:ml-7">
        {#if state.phase === 'deep-breathing'}
            <p class="text-lg">Breaths: {state.breathCount}</p>
        {/if}
        {#if state.phase === 'exhale-hold'}
            <p class="text-lg">Exhale Hold Time: {state.exhaleHoldTime}s</p>
        {/if}
        {#if state.phase === 'inhale-hold'}
            <p class="text-lg">Inhale Hold Time: {state.inhaleHoldTime}s</p>
        {/if}
    </div>
</div>

<div class="flex flex-col items-center justify-center bg-gray-900 text-white p-4 ml-7 lg:ml-10">

    <div class="flex mt-4">
        {#if state.phase === 'idle'}
            <button class="bg-green-500 text-xl rounded-full h-48 w-48" onclick={startSession}>Start</button>
        {/if}
        {#if state.phase === 'deep-breathing'}
            <button class="bg-yellow-500 ext-xl rounded-full animate-breath h-48 w-48" onclick={handleTap}>Tap to Enter<br>Exhale Hold</button>
        {/if}
        {#if state.phase === 'exhale-hold'}
            <button class="bg-yellow-500 ext-xl rounded-full h-48 w-48" onclick={handleTap}>Tap to Enter<br>Inhale Hold</button>
        {/if}
        {#if state.phase === 'inhale-hold'}
            <button class="bg-yellow-500 text-xl rounded-full h-48 w-48" onclick={handleTap}>Breathe</button>
        {/if}
    </div>
</div>


<div class="fixed bottom-2 right-2 text-sm text-gray-500">
    v{version}
  </div>



<div class="flex flex-col items-center justify-center bg-gray-900 text-white p-4">

    {#if state.showResultsOverlay}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-md">
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg text-center">

                <BarChart results={state.results} class="mb-8" />
                <LineChart results={state.results} class="mb-8" />

                <button class="mt-6 bg-green-500 px-6 py-3 text-xl rounded-lg" onclick={startSession}>
                    Start A New Session
                </button>
            </div>
        </div>
    {/if}
    </div>
