<script lang="ts">
  let currentTime = $state("");
  let showTodoModal = $state(false);
  let todos = $state([
    { id: 1, text: "learn rust for real this time", done: false },
    { id: 2, text: "fix nixos config (again)", done: false },
    { id: 3, text: "restart anki streak", done: false },
    { id: 4, text: "actually deploy this website", done: true },
    { id: 5, text: "stop rewriting todo apps", done: false },
  ]);
  let newTodo = $state("");
  let terminalOutput = $state([]);
  let currentCommand = $state("");
  let secretUnlocked = $state(false);
  let terminalTimeout = $state(null);

  const socialLinks = {
    github: "https://github.com/wlmr-rk",
    linkedin: "https://www.linkedin.com/in/wilmerlapuz/",
  };

  const terminalCommands = {
    "ls -la":
      "drwxr-xr-x projects/\ndrwxr-xr-x notes/\n-rw-r--r-- impostor_syndrome.log\n-rw-r--r-- .vimrc_i_never_use",
    whoami: "wilmer - professional yak shaver from pasig",
    "cat /proc/status": "Status: learning mode activated",
    "git status":
      "On branch main\nnothing to commit, working tree clean\n(lies, everything is broken)",
    "ps aux | grep focus": "focus    ???    not found (probably on reddit)",
    socials: `<span class="text-blue-400">GitHub:</span> <span class="text-slate-300">${socialLinks.github}</span>
<span class="text-blue-400">LinkedIn:</span> <span class="text-slate-300">${socialLinks.linkedin}</span>
<span class="text-green-400">Status:</span> <span class="text-slate-300">actively seeking opportunities</span>`,
    neofetch: `<span class="text-blue-400">OS:</span> <span class="text-slate-300">NixOS 24.05 unstable</span>
<span class="text-green-400">Kernel:</span> <span class="text-slate-300">6.8.something</span>
<span class="text-yellow-400">Shell:</span> <span class="text-slate-300">fish (like bash but prettier)</span>
<span class="text-purple-400">WM:</span> <span class="text-slate-300">Hyprland (rice level: trying too hard)</span>
<span class="text-cyan-400">Terminal:</span> <span class="text-slate-300">Alacritty (because cool kids use it)</span>
<span class="text-red-400">CPU:</span> <span class="text-slate-300">Ryzen 5600 (good enough for vim)</span>
<span class="text-orange-400">GPU:</span> <span class="text-slate-300">RX 6650XT (overkill for terminal)</span>
<span class="text-pink-400">Memory:</span> <span class="text-slate-300">32GB (chrome still uses it all)</span>`,
    fortune: "your bugs are features in disguise. very well disguised.",
    uptime: "coding: 2 years, debugging: 98% of that time",
    "cat .bashrc":
      'alias ll="ls -la"\nalias please="sudo"\nalias fix="git commit -m \'fix\'"',
    clear: "CLEAR_SCREEN",
  };

  const projects = [
    {
      id: "todo",
      name: "recursive todo",
      description: "a todo app to track building todo apps",
      stack: ["js", "react", "svelte"],
      status: "perpetually_unfinished",
      clickable: true,
      reality: "the 4th iteration of the same app",
    },
    {
      id: "nixos-rice",
      name: "nixos-2025-final-v2",
      description: "spent 3 weeks making terminal look aesthetic",
      stack: ["nix", "hyprland", "way_too_much_yaml"],
      status: "rice_achieved",
      clickable: false,
      reality: "breaks on every nixos-rebuild",
    },
    {
      id: "portfolio",
      name: "wilmerlapuz.com",
      description: "this website (finally deployed after buying domain)",
      stack: ["sveltekit", "tailwind"],
      status: "shipped",
      clickable: false,
      reality: "you are here",
    },
  ];

  const skills = [
    {
      name: "javascript",
      logo: `
            <i class="devicon-javascript-plain"></i>
          `,
      status: "can_make_things_work",
      truth: "mostly vibe coding error messages",
    },
    {
      name: "react",
      logo: `
            <i class="devicon-react-original"></i>
          `,
      status: "hooks_make_sense_now",
      truth: "useEffect dependency array still scary",
    },
    {
      name: "svelte",
      logo: `
            <i class="devicon-svelte-plain"></i>
          `,
      status: "the_chosen_one",
      truth: "feels like magic after react",
    },
    {
      name: "neovim",
      logo: `
            <i class="devicon-neovim-plain"></i>
          `,
      status: "daily_driver",
      truth: "everything else is slow",
    },
    {
      name: "rust",
      logo: `
            <i class="devicon-rust-original"></i>
          `,
      status: "aspirational",
      truth: "the book is on my shelf",
    },
    {
      name: "kotlin",
      logo: `
            <i class="devicon-kotlin-plain"></i>
          `,
      status: "someday_maybe",
      truth: "java but less painful (allegedly)",
    },
  ];

  // Modern Svelte 5 effects replacing onMount
  $effect(() => {
    // Time update effect
    const updateTime = () => {
      const now = new Date();
      currentTime = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  });

  $effect(() => {
    // Terminal timeout cleanup effect
    return () => {
      if (terminalTimeout) {
        clearTimeout(terminalTimeout);
      }
    };
  });

  function resetTerminalTimeout() {
    if (terminalTimeout) {
      clearTimeout(terminalTimeout);
    }
    terminalTimeout = setTimeout(() => {
      terminalOutput = [];
    }, 20000); // 20 seconds
  }

  function handleTerminalCommand(event) {
    if (event.key === "Enter") {
      const cmd = currentCommand.trim();
      resetTerminalTimeout();

      if (cmd === "clear") {
        terminalOutput = [];
      } else {
        const output =
          terminalCommands[cmd] || `zsh: command not found: ${cmd}`;
        terminalOutput = [...terminalOutput, `❯ ${cmd}`, output];
      }
      currentCommand = "";
    }
  }

  function handleTerminalInput() {
    resetTerminalTimeout();
  }

  function openTodoModal() {
    showTodoModal = true;
  }

  function closeTodoModal() {
    showTodoModal = false;
  }

  function addTodo() {
    if (newTodo.trim()) {
      todos = [
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          done: false,
        },
      ];
      newTodo = "";
    }
  }

  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  // Derived values (computed properties) using $derived
  const completedTodos = $derived(todos.filter((t) => t.done).length);
  const totalTodos = $derived(todos.length);
</script>

<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
/>

<svelte:head>
  <title>wilmer.exe - runtime: focus dependency</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100 font-mono relative">
  <!-- Glitch effect overlay -->
  {#if secretUnlocked}
    <div
      class="fixed inset-0 pointer-events-none z-50 bg-gradient-to-r from-red-500/20 to-blue-500/20 animate-pulse"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <p class="text-green-400 text-2xl font-bold animate-bounce">
          konami code activated!
        </p>
        <p class="text-slate-400">you found the secret, nerd</p>
      </div>
    </div>
  {/if}

  <!-- Custom status bar -->
  <div
    class="fixed top-0 w-full bg-slate-900/95 backdrop-blur border-b border-slate-700 px-4 py-1 z-40"
  >
    <div class="flex justify-between items-center text-xs">
      <div class="flex items-center gap-4">
        <span class="text-green-400">●</span>
        <span class="text-slate-400">~/wilmer</span>
        <span class="text-blue-400">git:(main)</span>
      </div>
      <div class="flex items-center gap-4 text-slate-500">
        <span>{currentTime} PHT</span>
      </div>
    </div>
  </div>

  <div class="pt-8 px-4">
    <section class="py-16">
      <div class="max-w-5xl mx-auto text-center">
        <pre
          class="text-green-400 mb-6 text-xs md:text-sm leading-none select-none">
{`rebuilding everything with next.js, post-breakup`}
        </pre>

        <div class="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
          <div class="bg-slate-900/30 border border-slate-800 rounded p-4">
            <span class="text-slate-500">[location]</span>
            <p class="text-slate-300">pasig city, ph</p>
          </div>
          <div class="bg-slate-900/30 border border-slate-800 rounded p-4">
            <span class="text-slate-500">[language]</span>
            <p class="text-slate-300">native ph, jlpt n5</p>
          </div>
          <div class="bg-slate-900/30 border border-slate-800 rounded p-4">
            <span class="text-slate-500">[os]</span>
            <p class="text-slate-300">nixos btw</p>
          </div>
        </div>

        <!-- Social Links Section -->
        <div class="mt-12">
          <p class="text-slate-500 text-sm mb-4">connect</p>
          <div class="flex justify-center gap-6">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive terminal -->
    <section class="py-8">
      <div class="max-w-4xl mx-auto">
        <div
          class="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-2xl"
        >
          <div
            class="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700"
          >
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span class="text-slate-400 text-xs"
              >fish v3.7.0 - auto-clear in 20s</span
            >
          </div>

          <div
            class="p-4 min-h-[200px] max-h-80 overflow-y-auto bg-slate-950/50"
          >
            <p class="text-slate-600 text-xs mb-4">
              # try: ls -la, whoami, neofetch, git status, fortune, socials
            </p>
            {#each terminalOutput as line}
              <p
                class="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap"
              >
                {@html line}
              </p>
            {/each}
            <div class="flex items-center mt-2">
              <span class="text-blue-400 mr-2">❯</span>
              <input
                bind:value={currentCommand}
                onkeydown={handleTerminalCommand}
                oninput={handleTerminalInput}
                class="bg-transparent border-none outline-none text-slate-100 flex-1 text-sm"
                placeholder="enter command..."
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects showcase -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-lg mb-8 text-slate-300">
          <span class="text-blue-400">class</span> Projects
          <span class="text-slate-500">{"{"}</span>
        </h2>

        <div class="space-y-4 ml-4">
          {#each projects as project}
            <div
              class="group border-l-2 border-slate-800 hover:border-blue-500 pl-6 py-4 transition-all duration-300"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3
                    class="text-slate-200 group-hover:text-blue-400 transition-colors"
                  >
                    {#if project.clickable}
                      <button onclick={openTodoModal} class="hover:underline"
                        >{project.name}()</button
                      >
                    {:else}
                      {project.name}
                    {/if}
                  </h3>
                  <p class="text-slate-400 text-sm mt-1">
                    {project.description}
                  </p>
                  <p class="text-slate-600 text-xs mt-1 italic">
                    {project.reality}
                  </p>
                </div>
                <span
                  class="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded ml-4"
                  >{project.status}</span
                >
              </div>
              <div class="flex flex-wrap gap-1 mt-3">
                {#each project.stack as tech}
                  <span
                    class="text-xs px-2 py-1 bg-slate-800/50 text-slate-500 rounded"
                    >{tech}</span
                  >
                {/each}
              </div>
            </div>
          {/each}
        </div>
        <p class="text-slate-500 ml-4 mt-4">{"}"}</p>
      </div>
    </section>

    <!-- Skills matrix -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-lg mb-8 text-slate-300 font-mono">
          <span class="text-green-400">let</span> skills =
          <span class="text-slate-500">[</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-3 ml-4">
          {#each skills as skill}
            <div
              class="bg-slate-900/30 border border-slate-800 rounded p-4 hover:border-slate-600 transition-colors group"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  {@html skill.logo}
                  <span
                    class="text-slate-200 group-hover:text-blue-400 transition-colors"
                    >"{skill.name}"</span
                  >
                </div>
                <span class="text-xs text-slate-500">{skill.status}</span>
              </div>
              <p class="text-xs text-slate-600 italic font-mono">
                // {skill.truth}
              </p>
            </div>
          {/each}
        </div>
        <p class="text-slate-500 ml-4 mt-4">];</p>
      </div>
    </section>

    <!-- Current status -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto">
        <div class="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
          <h2 class="text-lg mb-4 text-slate-300">
            <span class="text-purple-400">while</span> (learning)
            <span class="text-slate-500">{"{"}</span>
          </h2>
          <div class="ml-4 space-y-2 text-sm">
            <p class="text-slate-400">
              • maintaining nixos config that definitely won't break
            </p>
            <p class="text-slate-400">• trying to remember anki exists</p>
          </div>
          <p class="text-slate-500 mt-4">{"}"}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center border-t border-slate-800 mt-16">
      <p class="text-slate-600 text-xs">
        <span class="text-slate-500">// EOF</span> - compiled with determination
      </p>
    </footer>
  </div>
</div>

<!-- Todo Modal -->
{#if showTodoModal}
  <div
    class="fixed inset-0 bg-slate-950/80 backdrop-blur z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
    >
      <div
        class="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700"
      >
        <div class="flex items-center gap-2">
          <span class="text-green-400">●</span>
          <span class="text-slate-300 font-mono">recursive_todo.exe</span>
        </div>
        <button
          onclick={closeTodoModal}
          class="text-slate-400 hover:text-red-400 text-xl">×</button
        >
      </div>

      <div class="p-6">
        <h3 class="text-xl mb-4 text-slate-200 font-mono">
          the eternal todo list
        </h3>
        <p class="text-slate-400 text-sm mb-6">
          built in js, react, and svelte. this is the svelte version.
        </p>

        <div class="mb-4">
          <div class="flex gap-2">
            <input
              bind:value={newTodo}
              onkeydown={(e) => e.key === "Enter" && addTodo()}
              class="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
              placeholder="add another todo to ignore..."
            />
            <button
              onclick={addTodo}
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
            >
              add
            </button>
          </div>
        </div>

        <div class="space-y-2 max-h-60 overflow-y-auto">
          {#each todos as todo (todo.id)}
            <div
              class="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onchange={() => toggleTodo(todo.id)}
                class="accent-blue-500"
              />
              <span
                class="flex-1 text-sm {todo.done
                  ? 'line-through text-slate-500'
                  : 'text-slate-300'}"
              >
                {todo.text}
              </span>
              <button
                onclick={() => deleteTodo(todo.id)}
                class="text-red-400 hover:text-red-300 text-xs px-2"
              >
                ×
              </button>
            </div>
          {/each}
        </div>

        <div class="mt-4 text-xs text-slate-500 font-mono">
          <p>completed: {completedTodos}/{totalTodos}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  input:focus {
    outline: none;
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
</style>
