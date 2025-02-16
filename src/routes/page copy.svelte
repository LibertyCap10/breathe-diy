<script>
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    
    Chart.register(...registerables);

    let chartCanvas;
    let lastTap = 0;

    const state = $state({
        phase: 'idle', // 'deep-breathing', 'exhale-hold', 'inhale-hold'
        round: 1,
        breathCount: 0,
        deepBreathingTime: 0,
        exhaleHoldTime: 0,
        inhaleHoldTime: 15,
        results: [],
        timer: null,
        interval: null,
        showResultsOverlay: false, // Moved inside state
    });

    const clearTimers = () => {
        clearTimeout(state.timer);
        clearInterval(state.interval);
    };

    const startSession = () => {
        clearTimers();
        state.phase = 'deep-breathing';
        state.breathCount = 0;
        state.deepBreathingTime = 0;
        state.results = [];
        state.round = 1;
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
        state.results = [
            ...state.results,
            {
                round: state.round,
                breathCount: state.breathCount,
                deepBreathingTime: state.deepBreathingTime,
                exhaleHold: state.exhaleHoldTime,
                inhaleHold: state.inhaleHoldTime,
            },
        ];
        state.round++;
        updateChart();
        startSession();
    };

    const stopSession = () => {
        clearTimers();
        state.phase = 'idle';
        state.showResultsOverlay = true; // Properly updates UI state
    };

    const handleTap = () => {
        const now = new Date().getTime();
        if (now - lastTap < 300) {
            stopSession(); // Double-tap detected
        }
        lastTap = now;
    };

    onMount(() => {
        new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Exhale Hold (s)',
                        data: [],
                        borderColor: 'yellow',
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    });

    const updateChart = () => {
        if (!chartCanvas) return;
        const chart = Chart.getChart(chartCanvas);
        if (chart) {
            chart.data.labels = state.results.map((r) => `Round ${r.round}`);
            chart.data.datasets[0].data = state.results.map((r) => r.exhaleHold);
            chart.update();
        }
    };
</script>

<main class="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <p class="text-lg mb-8 font-bold">Round: {state.round}</p>

    <div class="flex space-x-4 mb-8">
        <div class={`px-4 py-2 rounded-sm ${state.phase === 'deep-breathing' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>Deep Breathing</div>
        <div class={`px-4 py-2 rounded-sm ${state.phase === 'exhale-hold' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}`}>Exhale Hold</div>
        <div class={`px-4 py-2 rounded-sm ${state.phase === 'inhale-hold' ? 'bg-green-500 text-white' : 'bg-gray-700'}`}>Inhale Hold</div>
    </div>

    <div class="flex mb-8">
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

    <div class="flex space-x-4 mt-4">
        {#if state.phase === 'idle'}
            <button class="bg-green-500 px-16 py-6 text-xl rounded-full" onclick={startSession}>Start</button>
        {/if}
        {#if state.phase !== 'idle'}
            <button class="bg-yellow-500 px-6 py-12 text-xl rounded-full" onclick={handleTap}>
                {state.phase === 'deep-breathing' ? 'Tap to Enter\nExhale Hold' :
                 state.phase === 'exhale-hold' ? 'Tap to Enter\nInhale Hold' :
                 'Breathe'}
            </button>
        {/if}
    </div>

    <div class="mt-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-2">Results</h2>
        <table class="w-full border-collapse border border-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="border border-gray-700 px-2 py-1">Round</th>
                    <th class="border border-gray-700 px-2 py-1">Deep Breathing</th>
                    <th class="border border-gray-700 px-2 py-1">Exhale Hold</th>
                    <th class="border border-gray-700 px-2 py-1">Inhale Hold</th>
                </tr>
            </thead>
            <tbody>
                {#each state.results as result}
                    <tr class="text-center">
                        <td class="border border-gray-700 px-2 py-1">{result.round}</td>
                        <td class="border border-gray-700 px-2 py-1">{result.breathCount} breaths</td>
                        <td class="border border-gray-700 px-2 py-1">{result.exhaleHold}s</td>
                        <td class="border border-gray-700 px-2 py-1">{15 - Number(result.inhaleHold)}s</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    {#if state.showResultsOverlay}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-md">
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg text-center">
                <h2 class="text-xl font-bold mb-4">Session Results</h2>
                <canvas bind:this={chartCanvas} class="w-full h-64"></canvas>
                <button class="mt-6 bg-green-500 px-6 py-3 text-xl rounded-lg" onclick={startSession}>
                    Start A New Session
                </button>
            </div>
        </div>
    {/if}
</main>
