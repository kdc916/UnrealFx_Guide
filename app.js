/* app.js - UnrealFX Master Orchestrator & Encyclopedia Search Engine */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Engines & Modules
    let aiEngine, materialLab, niagaraWizard, glossary;
    
    try {
        aiEngine = new VfxAiEngine();
        materialLab = new MaterialLab();
        niagaraWizard = new NiagaraWizard();
        glossary = new DocsGlossary(); // Dictionary backup
    } catch (e) {
        console.error("Initialization error:", e);
        showVisualError("초기 모듈 로딩 중 오류 발생: " + e.message);
    }

    // Active state tracking
    let activeStyle = 'stylized'; 
    let activeTier = 'aaa';       
    let currentChapterId = '0';

    // Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tocItems = document.querySelectorAll('.toc-item');
    const globalSearchInput = document.getElementById('globalSearch');
    const beginnerShortcutBtns = document.querySelectorAll('.shortcut-chip');
    
    const guideChapterBadge = document.getElementById('guideChapterBadge');
    const guideChapterTitle = document.getElementById('guideChapterTitle');
    const guideChapterSubtitle = document.getElementById('guideChapterSubtitle');
    const guideEditorialBody = document.getElementById('guideEditorialBody');
    const recipeTopicBtns = document.querySelectorAll('.recipe-topic-btn');
    const recipeChapterBadge = document.getElementById('recipeChapterBadge');
    const recipeChapterTitle = document.getElementById('recipeChapterTitle');
    const recipeChapterSubtitle = document.getElementById('recipeChapterSubtitle');
    const recipeEditorialBody = document.getElementById('recipeEditorialBody');
    const materialPresetSearch = document.getElementById('materialPresetSearch');

    // Initial load wrapped in a safe block to prevent halting of DOM event bindings!
    try {
        if (aiEngine) updateChapterContent(currentChapterId);
        if (materialLab) materialLab.renderGraph('glow');
        renderTechniqueRecipe('1');
        generateWizardRecipe();
    } catch (e) {
        console.error("Initial load rendering error:", e);
        showVisualError("첫 가이드북 렌더링 중 오류 발생: " + e.message);
    }

    // ==========================================
    // 2. TABS & SIDEBAR CHAPTER NAVIGATION
    // ==========================================
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    function switchTab(tabId) {
        tabBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
        });
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });

        // Specific tab initialization
        if (tabId === 'materials' && materialLab) {
            try {
                materialLab.renderGraph(materialLab.currentPreset);
            } catch (e) {
                console.error(e);
            }
        }
    }

    // Sidebar Chapters list clicks
    tocItems.forEach(item => {
        item.addEventListener('click', () => {
            openChapter(item.getAttribute('data-chapter'));
        });
    });

    beginnerShortcutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            beginnerShortcutBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetChapter = btn.getAttribute('data-open-chapter');
            const searchQuery = btn.getAttribute('data-search-query');

            if (targetChapter) {
                openChapter(targetChapter);
                if (globalSearchInput) globalSearchInput.value = '';
            } else if (searchQuery && globalSearchInput) {
                globalSearchInput.value = searchQuery;
                globalSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    });

    recipeTopicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            recipeTopicBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTechniqueRecipe(btn.getAttribute('data-recipe-chapter'));
            switchTab('recipes');
        });
    });

    function renderTechniqueRecipe(chapterId) {
        if (!aiEngine || !chapterId) return;
        const chapter = aiEngine.getChapter(chapterId);
        if (!chapter) return;

        if (recipeChapterBadge) recipeChapterBadge.innerText = `TECH ${chapter.num}`;
        if (recipeChapterTitle) recipeChapterTitle.innerText = chapter.title;
        if (recipeChapterSubtitle) recipeChapterSubtitle.innerText = chapter.subtitle;
        if (recipeEditorialBody) recipeEditorialBody.innerHTML = formatMarkdown(chapter.content);
    }

    function openChapter(chapterId) {
        if (!chapterId) return;
        currentChapterId = chapterId;
        tocItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-chapter') === chapterId);
        });
        beginnerShortcutBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-open-chapter') === chapterId);
        });

        try {
            updateChapterContent(chapterId);
        } catch(e) {
            console.error(e);
        }

        switchTab('guide');
        const tabGuideEl = document.getElementById('tab-guide');
        if (tabGuideEl) tabGuideEl.scrollTop = 0;
    }

    // Custom AI Planner Recipe generation click listener
    const btnGenerateCustomRecipe = document.getElementById('btnGenerateCustomRecipe');
    const sidebarCustomPrompt = document.getElementById('sidebarCustomPrompt');

    if (btnGenerateCustomRecipe && sidebarCustomPrompt) {
        btnGenerateCustomRecipe.addEventListener('click', () => {
            const promptText = sidebarCustomPrompt.value.trim();
            if (!promptText) {
                alert("구현하고자 하는 VFX 설계 요구사항을 입력해 주세요!");
                return;
            }

            if (!aiEngine) return;

            try {
                // Generate technical TA blueprint
                const recipe = aiEngine.generateCustomVfxRecipe(promptText);

                // Update Guidebook reader UI elements with the custom generated recipe
                if (guideChapterBadge) guideChapterBadge.innerText = recipe.num === "CUSTOM" ? "맞춤 AI 설계" : `CHAPTER ${recipe.num}`;
                if (guideChapterTitle) guideChapterTitle.innerText = recipe.title;
                if (guideChapterSubtitle) guideChapterSubtitle.innerText = recipe.subtitle;

                if (guideEditorialBody) {
                    guideEditorialBody.innerHTML = formatMarkdown(recipe.content);
                }

                // Clear all active chapter highlights in the TOC list since we are showing a custom AI recipe
                tocItems.forEach(b => b.classList.remove('active'));

                // Switch active tab to Guidebook reader view
                switchTab('guide');

                // Smooth scroll to top of guidebook reader pane
                const tabGuideEl = document.getElementById('tab-guide');
                if (tabGuideEl) {
                    tabGuideEl.scrollTop = 0;
                }
            } catch (e) {
                console.error("Error generating custom VFX blueprint:", e);
                showVisualError("맞춤형 VFX 설계 도면 생성 중 에러 발생: " + e.message);
            }
        });
    }

    // Renders chapter content into the reader panel
    function updateChapterContent(chapterId) {
        if (!aiEngine) return;
        const chapter = aiEngine.getChapter(chapterId);
        if (!chapter) return;

        if (guideChapterBadge) guideChapterBadge.innerText = `CHAPTER ${chapter.num}`;
        if (guideChapterTitle) guideChapterTitle.innerText = chapter.title;
        if (guideChapterSubtitle) guideChapterSubtitle.innerText = chapter.subtitle;

        // Render Markdown or Interactive Dictionary into rich editorial elements
        if (guideEditorialBody) {
            if (chapterId === '4' || chapterId === '5' || chapterId === '6' || chapterId === '7') {
                renderInteractiveGlossary(chapterId);
            } else {
                guideEditorialBody.innerHTML = formatMarkdown(chapter.content);
            }
        }
    }

    // Helper toast notification
    function showToast(message) {
        const alertBox = document.getElementById('copyAlert');
        if (alertBox) {
            const prevText = alertBox.innerText;
            alertBox.innerText = message;
            alertBox.classList.add('show');
            setTimeout(() => {
                alertBox.classList.remove('show');
                setTimeout(() => {
                    alertBox.innerText = prevText;
                }, 300); // Revert after transition
            }, 2200);
        }
    }

    // Dynamically builds the interactive searchable encyclopedia cards
    function renderInteractiveGlossary(chapterId) {
        let cat = '';
        let catTitle = '';
        let subCats = [];

        if (chapterId === '4') {
            cat = 'niagara';
            catTitle = '나이아가라 모듈';
            subCats = ['전체', '나이아가라 스폰', '나이아가라 업데이트', '나이아가라 렌더러'];
        } else if (chapterId === '5') {
            cat = 'material';
            catTitle = '머터리얼 노드';
            subCats = ['전체', '머터리얼 UV', '머터리얼 수학', '머터리얼 뎁스'];
        } else if (chapterId === '6') {
            cat = 'opt';
            catTitle = '최적화 백서';
            subCats = ['전체', '최적화'];
        } else if (chapterId === '7') {
            cat = 'unity';
            catTitle = '유니티 ➡️ 언리얼 이식';
            subCats = ['전체', '기본/스폰', '물리/거동', '렌더러/텍스처'];
        }

        // Get matching terms from database
        const filteredTerms = glossary.terms.filter(t => t.cat === cat);

        // Generate Pills HTML
        let pillsHtml = subCats.map((sc, idx) => `
            <button class="pill-btn ${idx === 0 ? 'active' : ''}" data-subcat="${sc}">
                ${sc}
            </button>
        `).join('');

        const glossaryIntroHtml = cat === 'niagara' ? `
            <section class="niagara-workflow-primer">
                <h3>Niagara 초보자 작업 흐름</h3>
                <p>Niagara는 <strong>System -> Emitter -> Module -> Parameter</strong> 순서로 이해하면 가장 빠릅니다. System은 전체 이펙트 컨테이너이고, Emitter는 한 종류의 입자 흐름, Module은 Spawn/Update/Render 단계에서 실행되는 작업 블록, Parameter는 숫자와 색상 같은 조절값입니다.</p>
                <div class="workflow-strip">
                    <span>System 생성</span>
                    <span>Emitter 선택</span>
                    <span>Spawn 규칙</span>
                    <span>Update 움직임</span>
                    <span>Renderer 선택</span>
                    <span>Material 연결</span>
                    <span>레벨 반복 튜닝</span>
                </div>
                <p>초보자는 먼저 <strong>Emitter Spawn -> Emitter Update -> Particle Spawn -> Particle Update -> Event Handler -> Renderer</strong> 순서로 스택을 읽으세요. 보이지 않으면 Renderer/Material/Bounds부터 확인하고, 움직임이 이상하면 Update 모듈과 Solver 순서를 확인합니다.</p>
                <div class="workflow-grid">
                    <div><strong>Spawn</strong><br>태어날 때 한 번 정하는 값: 위치, 초기 속도, 색상, 크기</div>
                    <div><strong>Update</strong><br>살아있는 동안 매 프레임 변하는 값: 중력, 드래그, 노이즈, 스케일</div>
                    <div><strong>Event</strong><br>충돌, 죽음, 위치 이벤트를 다른 이미터로 전달</div>
                    <div><strong>Renderer</strong><br>Sprite, Ribbon, Mesh, Light로 실제 화면에 표시</div>
                </div>
            </section>
        ` : '';

        // Generate Grid and Search Box HTML
        let html = `
            <div class="doc-glossary-container">
                <div class="glossary-search-header">
                    <div class="glossary-search-wrapper">
                        <input type="text" id="docChapterSearch" placeholder="${catTitle} 대사전 검색... (예: 스폰, 패닝, 뎁스, 오버드로, Emission, Color)">
                        <span class="glossary-search-icon">🔍</span>
                    </div>
                    <div class="glossary-pills" id="glossaryPills">
                        ${pillsHtml}
                    </div>
                </div>
                ${glossaryIntroHtml}
                
                <div class="doc-glossary-grid" id="glossaryGrid">
                    ${filteredTerms.map(t => {
                        // Generate appropriate action button
                        let actionButton = '';
                        if (cat === 'material') {
                            // Find matching preset
                            let preset = 'glow';
                            const termLower = t.term.toLowerCase();
                            if (termLower.includes('decal') || termLower.includes('데칼')) preset = 'decal';
                            else if (termLower.includes('parallax') || termLower.includes('occlusion') || termLower.includes('pom') || termLower.includes('bump') || termLower.includes('패럴렉스') || termLower.includes('범프')) preset = 'parallax';
                            else if (termLower.includes('refraction') || termLower.includes('굴절') || termLower.includes('distortion') || termLower.includes('왜곡')) preset = 'distortion';
                            else if (termLower.includes('sine') || termLower.includes('cosine') || termLower.includes('삼각')) preset = 'slashribbon';
                            else if (termLower.includes('fresnel') || termLower.includes('프레넬')) preset = 'emissive';
                            else if (termLower.includes('depth fade') || termLower.includes('뎁스 페이드') || termLower.includes('안개')) preset = 'gasfog';
                            else if (termLower.includes('shockwave') || termLower.includes('충격')) preset = 'shockwave';
                            else if (termLower.includes('step') || termLower.includes('임계')) preset = 'firecel';
                            
                            actionButton = `<button class="glossary-action-btn jump-to-tab" data-target="materials" data-preset="${preset}">⚡ Material Library</button>`;
                        } else if (cat === 'niagara') {
                            actionButton = `<button class="glossary-action-btn jump-to-tab" data-target="niagara">🌀 Niagara Planner</button>`;
                        } else if (cat === 'unity') {
                            // Unity Shuriken mapping redirects to Niagara Wizard or Material Copy Lab depending on module
                            const termLower = t.term.toLowerCase();
                            if (termLower.includes('color') || termLower.includes('size') || termLower.includes('renderer')) {
                                actionButton = `<button class="glossary-action-btn jump-to-tab" data-target="niagara">🌀 Niagara Planner</button>`;
                            } else {
                                actionButton = `<button class="glossary-action-btn jump-to-tab" data-target="niagara">🌀 Niagara Planner</button>`;
                            }
                        }

                        return `
                            <div class="glossary-card" 
                                 data-subcat="${t.catName}" 
                                 data-term="${t.term.toLowerCase()}" 
                                 data-def="${t.def.toLowerCase()}" 
                                 data-why="${t.why.toLowerCase()}" 
                                 data-platform="${(t.platform || '모든 플랫폼 (PC, 콘솔, 모바일)').toLowerCase()}" 
                                 data-formula="${t.formula.toLowerCase()}"
                                 data-aliases="${(t.aliases || []).join(' ').toLowerCase()}">
                                <div class="glossary-card-header ${cat}">
                                    <span class="glossary-card-badge">${t.catName}</span>
                                    <h4 class="glossary-card-title">${t.term}</h4>
                                </div>
                                <div class="glossary-card-body">
                                    <div class="glossary-detail-section">
                                        <span class="detail-label role">🎯 ${cat === 'unity' ? '이식 대응 관계 (Translation)' : '역할 (Role)'}</span>
                                        <p class="detail-text">${t.def}</p>
                                    </div>
                                    <div class="glossary-detail-section">
                                        <span class="detail-label why">🔗 ${cat === 'unity' ? '이식 설계 비법 (Migration Secret)' : '연결 설계 이유 (Rationale)'}</span>
                                        <p class="detail-text">${t.why}</p>
                                    </div>
                                    <div class="glossary-detail-section">
                                        <span class="detail-label platform">🎮 플랫폼 사양 (Platform Spec)</span>
                                        <p class="detail-text">${t.platform || '모든 플랫폼 (PC, 콘솔, 모바일)'}</p>
                                    </div>
                                    <div class="glossary-detail-section">
                                        <span class="detail-label formula">🎬 ${cat === 'unity' ? 'VFX 파라미터 매핑 공식 (Parameter Match)' : '활용 이펙트 공식 (VFX Formula)'}</span>
                                        <p class="detail-text">${t.formula}</p>
                                    </div>
                                    ${t.migrationDetail ? `
                                     <div class="glossary-detail-section">
                                         <span class="detail-label migration-detail">📖 언리얼 공식 레퍼런스 상세 (Epic Reference Details)</span>
                                         <p class="detail-text migration-detail-box">${t.migrationDetail}</p>
                                     </div>` : ''}
                                    ${t.epicLink ? `
                                     <div class="glossary-detail-section">
                                         <span class="detail-label link">🌐 에픽 공식 문서 (Official Doc)</span>
                                         <p class="detail-text">
                                             <a href="${t.epicLink}" target="_blank" class="epic-doc-link">
                                                 공식 레퍼런스 보기 ↗
                                             </a>
                                         </p>
                                     </div>` : ''}
                                </div>
                                <div class="glossary-card-actions">
                                    <button class="glossary-action-btn copy-formula" data-formula="${t.formula.replace(/"/g, '&quot;')}">
                                        ${cat === 'unity' ? '📋 이식 가이드 복사' : '📋 공식 복사'}
                                    </button>
                                    ${actionButton}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        guideEditorialBody.innerHTML = html;

        // Bind interactive events within the container
        const docChapterSearch = document.getElementById('docChapterSearch');
        const glossaryPills = document.querySelectorAll('#glossaryPills .pill-btn');
        const glossaryCards = document.querySelectorAll('#glossaryGrid .glossary-card');
        let activeSubCat = '전체';

        // Filter cards dynamically
        function filterGlossary() {
            const query = docChapterSearch.value.trim().toLowerCase();
            const compactQuery = query.replace(/[\s_\-/>]+/g, '');
            
            glossaryCards.forEach(card => {
                const subcat = card.getAttribute('data-subcat');
                const term = card.getAttribute('data-term');
                const def = card.getAttribute('data-def');
                const why = card.getAttribute('data-why');
                const platform = card.getAttribute('data-platform');
                const formula = card.getAttribute('data-formula');
                const aliases = card.getAttribute('data-aliases') || '';
                const searchBlob = `${term} ${def} ${why} ${platform} ${formula} ${aliases}`;
                const compactSearchBlob = searchBlob.replace(/[\s_\-/>]+/g, '');

                const matchesPill = (activeSubCat === '전체' || subcat === activeSubCat);
                const matchesSearch = (!query || searchBlob.includes(query) || compactSearchBlob.includes(compactQuery));

                if (matchesPill && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function setupNiagaraWorkflowModules() {
            if (cat !== 'niagara') return;

            const strip = document.getElementById('niagaraWorkflowStrip') || guideEditorialBody.querySelector('.workflow-strip');
            if (!strip || !docChapterSearch) return;

            let panel = document.getElementById('workflowModulePanel');
            if (!panel) {
                panel = document.createElement('div');
                panel.id = 'workflowModulePanel';
                panel.className = 'workflow-module-panel';
                strip.insertAdjacentElement('afterend', panel);
            }

            const steps = [
                {
                    title: 'System 생성',
                    note: '처음에는 전체 이펙트의 수명, 반복, 풀링, Bounds를 잡습니다.',
                    modules: ['System State', 'Spawn Burst Instantaneous', 'System Location', 'Set Variables']
                },
                {
                    title: 'Emitter 선택',
                    note: 'Sprite, Ribbon, Mesh, Beam 중 어떤 입자 흐름을 만들지 정합니다.',
                    modules: ['Emitter State', 'Initialize Particle', 'Initialize Ribbon', 'Initialize Mesh Reproduction Sprite']
                },
                {
                    title: 'Spawn 규칙',
                    note: '파티클이 어디서, 몇 개, 어떤 초기값으로 태어나는지 정합니다.',
                    modules: ['Spawn Rate', 'Spawn Burst Instantaneous', 'Box Location', 'Sphere Location', 'Cone Location', 'Cylinder Location', 'Grid Location', 'Torus Location', 'Static Mesh Location', 'Skeletal Mesh Location', 'Add Velocity', 'Add Velocity in Cone', 'Inherit Velocity']
                },
                {
                    title: 'Update 움직임',
                    note: '살아있는 동안 매 프레임 움직임, 힘, 소멸 조건을 조정합니다.',
                    modules: ['Curl Noise Force', 'Drag', 'Gravity Force', 'Acceleration Force', 'Vortex Force', 'Wind Force', 'Point Force', 'Line Attraction Force', 'Vector Noise Force', 'Scale Velocity', 'Jitter Position', 'Rotate Around Point', 'Kill Particles', 'Kill Particles in Volume']
                },
                {
                    title: 'Renderer 선택',
                    note: '계산된 파티클을 화면에 Sprite, Ribbon, Mesh, Beam, Light로 표시합니다.',
                    modules: ['Sprite Renderer', 'Ribbon Renderer', 'Mesh Renderer', 'Light Renderer', 'Beam Width', 'Spawn Beam', 'Camera Offset', 'Maintain in Camera Particle Scale', 'Scale Ribbon Width']
                },
                {
                    title: 'Material 연결',
                    note: 'Niagara 값을 머터리얼로 넘겨 색, 알파, 디졸브, 프레임을 제어합니다.',
                    modules: ['Dynamic Material Parameters', 'Sub UV Texture Sample', 'Sample Texture', 'Sample Pseudo Volume Texture', 'World Aligned Texture Sample', 'Lerp Particle Attributes', 'Temporal Lerp Float', 'Temporal Lerp Vector']
                },
                {
                    title: '레벨 반복 튜닝',
                    note: '실제 레벨에서 이벤트, 카메라, 최적화, 파괴 데이터 연동을 확인합니다.',
                    modules: ['Generate Location Event', 'Apply Chaos Data', 'Spawn from Chaos', 'Apply Vector Field', 'Sample Vector Field', 'Recreate Camera Projection', 'Do Once', 'Increment Over Time']
                }
            ];

            const stepEls = Array.from(strip.children);
            const normalizeWorkflowText = (value) => String(value || '').toLowerCase().replace(/[\s_\-/>]+/g, '');
            const findWorkflowModule = (moduleName) => {
                const normalizedName = normalizeWorkflowText(moduleName);
                return filteredTerms.find(term => normalizeWorkflowText(term.term).includes(normalizedName)) ||
                    filteredTerms.find(term => normalizeWorkflowText(term.term) === normalizedName);
            };

            const renderWorkflowModuleDetail = (moduleName) => {
                const detail = panel.querySelector('#workflowModuleDetail');
                if (!detail) return;

                const moduleInfo = findWorkflowModule(moduleName);
                if (!moduleInfo) {
                    detail.innerHTML = `
                        <div class="workflow-module-detail-empty">
                            <strong>${moduleName}</strong>
                            <span>아직 상세 카드가 연결되지 않은 모듈입니다. 상단 검색에서 다시 확인해 주세요.</span>
                        </div>
                    `;
                    return;
                }

                detail.innerHTML = `
                    <article class="workflow-module-detail-card">
                        <div class="workflow-module-detail-head">
                            <span>${moduleInfo.catName || 'Niagara Module'}</span>
                            <h4>${moduleInfo.term}</h4>
                        </div>
                        <div class="workflow-module-detail-grid">
                            <section><strong>역할</strong><p>${moduleInfo.def}</p></section>
                            <section><strong>초보자는 언제 쓰나</strong><p>${moduleInfo.why}</p></section>
                            <section><strong>작업 순서</strong><p>${moduleInfo.formula}</p></section>
                            <section><strong>플랫폼 체크</strong><p>${moduleInfo.platform}</p></section>
                        </div>
                        ${moduleInfo.epicLink ? `<a class="epic-doc-link workflow-doc-link" href="${moduleInfo.epicLink}" target="_blank" rel="noopener noreferrer">공식 문서에서 확인</a>` : ''}
                    </article>
                `;
            };

            const renderStep = (index) => {
                const step = steps[index] || steps[0];
                stepEls.forEach((el, i) => el.classList.toggle('active', i === index));
                panel.innerHTML = `
                    <div class="workflow-module-copy">
                        <strong>${step.title}</strong>
                        <span>${step.note}</span>
                    </div>
                    <div class="workflow-module-chips">
                        ${step.modules.map(moduleName => `<button type="button" class="workflow-module-chip" data-module-name="${moduleName}">${moduleName}</button>`).join('')}
                    </div>
                    <div class="workflow-module-detail" id="workflowModuleDetail"></div>
                `;

                panel.querySelectorAll('.workflow-module-chip').forEach(chip => {
                    chip.addEventListener('click', () => {
                        const moduleName = chip.getAttribute('data-module-name');
                        panel.querySelectorAll('.workflow-module-chip').forEach(btn => btn.classList.toggle('active', btn === chip));
                        docChapterSearch.value = moduleName;
                        renderWorkflowModuleDetail(moduleName);
                        return;
                        docChapterSearch.value = chip.getAttribute('data-module-name');
                        activeSubCat = '?꾩껜';
                        glossaryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-subcat') === activeSubCat));
                        filterGlossary();
                        document.getElementById('glossaryGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                });

                const firstChip = panel.querySelector('.workflow-module-chip');
                if (firstChip) {
                    firstChip.classList.add('active');
                    renderWorkflowModuleDetail(firstChip.getAttribute('data-module-name'));
                }
            };

            stepEls.forEach((el, index) => {
                el.classList.add('workflow-step-btn');
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
                el.addEventListener('click', () => renderStep(index));
                el.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        renderStep(index);
                    }
                });
            });

            renderStep(0);
        }

        // Keyup input listener for live search filter
        if (docChapterSearch) {
            docChapterSearch.addEventListener('input', filterGlossary);
        }

        setupNiagaraWorkflowModules();

        // Sub-category pill switching listener
        glossaryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                glossaryPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeSubCat = pill.getAttribute('data-subcat');
                filterGlossary();
            });
        });

        // Setup copy formula button clicks
        const copyBtns = guideEditorialBody.querySelectorAll('.copy-formula');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const formulaText = btn.getAttribute('data-formula');
                navigator.clipboard.writeText(formulaText).then(() => {
                    if (cat === 'unity') {
                        showToast('유니티 ➡️ 언리얼 VFX 이식 가이드가 복사되었습니다!');
                    } else {
                        showToast('VFX 활용 공식이 클립보드에 복사되었습니다!');
                    }
                }).catch(err => {
                    console.error('Clipboard copy failed:', err);
                });
            });
        });

        // Setup jump to tab clicks
        const jumpBtns = guideEditorialBody.querySelectorAll('.jump-to-tab');
        jumpBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-target');
                
                if (targetTab === 'materials') {
                    const preset = btn.getAttribute('data-preset');
                    if (materialLab) {
                        materialLab.currentPreset = preset;
                        const presetBtns = document.querySelectorAll('.node-preset-btn');
                        presetBtns.forEach(pb => {
                            pb.classList.toggle('active', pb.getAttribute('data-node') === preset);
                        });
                    }
                }
                
                switchTab(targetTab);
            });
        });
    }


    // Robust Markdown Parser with strict list & alert callout checks
    function formatMarkdown(text) {
        if (!text) return '';
        let lines = text.split('\n');
        let html = '';
        let inList = false; // 'ul', 'ol', or false
        let inCodeBlock = false;
        let inBlockquote = false;
        let skipOfficialDocFooter = false;

        lines.forEach(line => {
            line = line.trim();

            const isOfficialDocFooter =
                line.includes('공식 문서 바로가기') ||
                (line.startsWith('###') && line.includes('dev.epicgames.com') && line.includes('Niagara Overview'));

            if (isOfficialDocFooter) {
                if (inList) {
                    html += `</${inList}>`;
                    inList = false;
                }
                skipOfficialDocFooter = true;
                return;
            }

            if (skipOfficialDocFooter) {
                const isFooterLink = line.startsWith('- [') && line.includes('dev.epicgames.com');
                if (isFooterLink || line === '') return;
                skipOfficialDocFooter = false;
            }

            // 1. Code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    html += '</code></pre>';
                    inCodeBlock = false;
                } else {
                    html += '<pre><code>';
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                // Escape HTML tags in code block safely
                const escapedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                html += escapedLine + '\n';
                return;
            }

            // 2. Unordered lists
            if (line.startsWith('- ') || line.startsWith('* ')) {
                if (inList !== 'ul') {
                    if (inList) html += `</${inList}>`;
                    html += '<ul>';
                    inList = 'ul';
                }
                html += `<li>${parseInlineMarkdown(line.substring(2))}</li>`;
                return;
            } 
            
            // 3. Ordered lists
            if (line.match(/^\d+\.\s/)) {
                const matchIndex = line.indexOf('. ');
                if (inList !== 'ol') {
                    if (inList) html += `</${inList}>`;
                    html += '<ol>';
                    inList = 'ol';
                }
                html += `<li>${parseInlineMarkdown(line.substring(matchIndex + 2))}</li>`;
                return;
            } 
            
            // Close open lists if a non-list item is reached
            if (inList) {
                html += `</${inList}>`;
                inList = false;
            }

            // 4. Custom GitHub-style alerts/blockquotes
            if (line.startsWith('> [!')) {
                const match = line.match(/>\s*\[!(NOTE|IMPORTANT|WARNING|CAUTION)\]/i);
                if (match) {
                    const alertType = match[1].toLowerCase();
                    html += `<blockquote class="alert-${alertType}"><strong>💡 ${alertType.toUpperCase()}:</strong> `;
                    inBlockquote = true;
                }
                return;
            }

            if (line.startsWith('>') && inBlockquote) {
                html += parseInlineMarkdown(line.substring(1)) + '<br>';
                return;
            } else if (inBlockquote) {
                html += '</blockquote>';
                inBlockquote = false;
            }

            // 5. Headers & Separators
            if (line.startsWith('#### ')) {
                html += `<h4>${parseInlineMarkdown(line.substring(5))}</h4>`;
            } else if (line.startsWith('### ')) {
                html += `<h3>${parseInlineMarkdown(line.substring(4))}</h3>`;
            } else if (line.startsWith('## ')) {
                html += `<h2>${parseInlineMarkdown(line.substring(3))}</h2>`;
            } else if (line.startsWith('---')) {
                html += '<hr>';
            } else if (line) {
                html += `<p>${parseInlineMarkdown(line)}</p>`;
            }
        });

        // Safe residual tag closers
        if (inList) html += `</${inList}>`;
        if (inBlockquote) html += '</blockquote>';

        return html;
    }

    function parseInlineMarkdown(line) {
        if (!line) return '';
        const officialDocLinks = {
            'Niagara Overview': 'https://dev.epicgames.com/documentation/unreal-engine/overview-of-niagara-effects-for-unreal-engine?lang=en-US',
            'System / Emitter Module Reference': 'https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine',
            'Niagara Module Reference': 'https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine',
            'System and Emitter Module Reference': 'https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine',
            'Niagara Blueprint API': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/Niagara',
            'Niagara Fluids / Scratch Pad / Data Channels': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-fluids-in-unreal-engine',
            'Niagara Fluids': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-fluids-in-unreal-engine',
            'Scratch Pad': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-scratch-pad-in-unreal-engine',
            'Data Channels': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-data-channels-in-unreal-engine',
            'Material Editor User Guide': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-editor-user-guide',
            'Material Properties': 'https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-material-properties?lang=en-US',
            'Material Expressions Reference': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-expressions-reference',
            'Material Functions / Material Instances': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-functions-in-unreal-engine',
            'Material Functions': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-functions-in-unreal-engine',
            'Material Instances': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-instancing-in-unreal-engine',
            'Content Browser': 'https://dev.epicgames.com/documentation/unreal-engine/content-browser-in-unreal-engine?lang=en-US',
            'Content Browser Interface': 'https://dev.epicgames.com/documentation/unreal-engine/content-browser-interface-in-unreal-engine',
            'Migrating Assets': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/migrating-assets-in-unreal-engine',
            'Post Process Effects': 'https://dev.epicgames.com/documentation/unreal-engine/post-process-effects-in-unreal-engine',
            'Post Process Materials': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine',
            'Color Grading / Exposure / Bloom': 'https://dev.epicgames.com/documentation/unreal-engine/post-process-effects-in-unreal-engine',
            'Color Grading': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine',
            'Exposure': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/auto-exposure-in-unreal-engine',
            'Bloom': 'https://dev.epicgames.com/documentation/en-us/unreal-engine/bloom-in-unreal-engine'
        };

        const makeOfficialDocLink = (title, url) =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="epic-doc-link"><strong>${title}</strong></a>`;

        const findOfficialDocUrl = (label) => {
            const normalizedLabel = label.trim().replace(/\s+/g, ' ');
            if (officialDocLinks[normalizedLabel]) return officialDocLinks[normalizedLabel];

            const compactLabel = normalizedLabel.toLowerCase().replace(/[^a-z0-9]+/g, '');
            const matchedKey = Object.keys(officialDocLinks).find(key => {
                const compactKey = key.toLowerCase().replace(/[^a-z0-9]+/g, '');
                return compactLabel === compactKey || compactLabel.includes(compactKey) || compactKey.includes(compactLabel);
            });

            return matchedKey ? officialDocLinks[matchedKey] : null;
        };

        const compositeOfficialDocLinks = {
            'Niagara Fluids / Scratch Pad / Data Channels': [
                ['Niagara Fluids', officialDocLinks['Niagara Fluids']],
                ['Scratch Pad', officialDocLinks['Scratch Pad']],
                ['Data Channels', officialDocLinks['Data Channels']]
            ],
            'Material Functions / Material Instances': [
                ['Material Functions', officialDocLinks['Material Functions']],
                ['Material Instances', officialDocLinks['Material Instances']]
            ],
            'Color Grading / Exposure / Bloom': [
                ['Color Grading', officialDocLinks['Color Grading']],
                ['Exposure', officialDocLinks['Exposure']],
                ['Bloom', officialDocLinks['Bloom']]
            ]
        };

        return line
            .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (match, label, url) => {
                const linkClass = url.includes('dev.epicgames.com') ? ' class="epic-doc-link"' : '';
                return `<a href="${url}" target="_blank" rel="noopener noreferrer"${linkClass}>${label}</a>`;
            })
            .replace(/\*\*(.*?)\*\*/g, (match, label) => {
                const normalizedLabel = label.trim();
                const compositeLinks = compositeOfficialDocLinks[normalizedLabel];
                if (compositeLinks) {
                    return compositeLinks
                        .map(([title, url]) => makeOfficialDocLink(title, url))
                        .join(' / ');
                }

                const url = findOfficialDocUrl(normalizedLabel);
                if (!url) return `<strong>${label}</strong>`;
                return makeOfficialDocLink(label, url);
            })
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }


    // ==========================================
    // 3. ENCYCLOPEDIA MASTER SEARCH ENGINE
    // ==========================================
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                // Restore current chapter highlight
                tocItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-chapter') === currentChapterId);
                });
                updateChapterContent(currentChapterId);
                return;
            }

            const techniqueRoute = findTechniqueRoute(query);
            if (techniqueRoute) {
                recipeTopicBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-recipe-chapter') === techniqueRoute);
                });
                renderTechniqueRecipe(techniqueRoute);
                switchTab('recipes');
                return;
            }

            // Search match in chapters
            let bestChapterId = null;
            if (aiEngine) {
                for (let id in aiEngine.chapters) {
                    if (['1', '2', '3'].includes(id)) continue;
                    const ch = aiEngine.chapters[id];
                    if (ch.title.toLowerCase().includes(query) || 
                        ch.content.toLowerCase().includes(query) || 
                        ch.subtitle.toLowerCase().includes(query)) {
                        bestChapterId = id;
                        break;
                    }
                }
            }

            if (bestChapterId) {
                openChapter(bestChapterId);
                
                // Scroll sidebar TOC to that item
                const targetTocItem = document.querySelector(`.toc-item[data-chapter="${bestChapterId}"]`);
                if (targetTocItem) {
                    targetTocItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }

    function findTechniqueRoute(query) {
        const shockwaveKeys = ['쇼크웨이브', '충격파', 'shockwave', 'shock wave', 'radial shockwave'];
        const fireAaaKeys = ['aaa fire', '화염 aaa', '불 aaa', 'fire aaa', '히어로 화염'];
        const smokeAaaKeys = ['연기', 'smoke', '스모크', '가스', 'gas', '안개'];
        const waterAaaKeys = ['물보라', '수면', '파문', 'ripple', 'splash', 'water aaa', 'shallow water'];
        const lavaDecalKeys = ['용암 균열', '용암균열', 'lava crack', 'melt decal', 'lava decal', '균열 데칼', '땅 파인', '땅이 파인', 'depth decal'];
        const aaaDissolveKeys = ['aaa dissolve', '소멸 aaa', '소멸 레시피', 'vanish', '캐릭터 소멸'];
        const decalKeys = ['데칼', 'decal', 'dbuffer', '탄흔', '마법진'];
        const dissolveKeys = ['디졸브', 'dissolve', '소멸', 'fade', 'erosion'];
        const elementalKeys = ['화염', '불', 'fire', '물', 'water', '번개', 'lightning', '바람', 'wind', '얼음', 'ice', '원소'];

        if (shockwaveKeys.some(key => query.includes(key))) return '9';
        if (fireAaaKeys.some(key => query.includes(key))) return '10';
        if (smokeAaaKeys.some(key => query.includes(key))) return '11';
        if (waterAaaKeys.some(key => query.includes(key))) return '12';
        if (lavaDecalKeys.some(key => query.includes(key))) return '13';
        if (aaaDissolveKeys.some(key => query.includes(key))) return '14';
        if (decalKeys.some(key => query.includes(key))) return '1';
        if (dissolveKeys.some(key => query.includes(key))) return '2';
        if (elementalKeys.some(key => query.includes(key))) return '3';
        return null;
    }

    if (materialPresetSearch) {
        materialPresetSearch.addEventListener('input', () => {
            const query = materialPresetSearch.value.trim().toLowerCase();
            document.querySelectorAll('.node-preset-btn').forEach(btn => {
                const text = btn.innerText.toLowerCase();
                const key = (btn.getAttribute('data-node') || '').toLowerCase();
                const info = materialLab && materialLab.nodeDescriptions ? materialLab.nodeDescriptions[key] : null;
                const haystack = `${text} ${key} ${info ? info.title + ' ' + info.desc : ''}`.toLowerCase();
                btn.style.display = !query || haystack.includes(query) ? 'inline-flex' : 'none';
            });
        });
    }


    // ==========================================
    // 4. ADAPTIVE CONTROLLER (STYLE & TIER DYNAMICS)
    // ==========================================
    const styleFilterBtns = document.querySelectorAll('#sidebar-filter-style .filter-btn');
    const tierFilterBtns = document.querySelectorAll('#sidebar-filter-tier .filter-btn');
    const currentTierBadge = document.getElementById('current-tier-badge');

    // Handle Style Toggles
    styleFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            styleFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeStyle = btn.getAttribute('data-style');
            updateAiFilters(activeStyle, activeTier);
        });
    });

    // Handle Tier Toggles
    tierFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tierFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeTier = btn.getAttribute('data-tier');
            updateAiFilters(activeStyle, activeTier);
        });
    });

    function updateAiFilters(style, tier) {
        activeStyle = style;
        activeTier = tier;

        if (aiEngine) {
            aiEngine.setMode(style, tier);
        }

        // Update badge UI
        if (currentTierBadge) {
            currentTierBadge.innerText = tier === 'aaa' ? 'AAA CONSOLE' : 'CASUAL PLATFORM';
            currentTierBadge.style.borderColor = tier === 'aaa' ? 'var(--epic-orange)' : 'var(--niagara-purple)';
            currentTierBadge.style.color = tier === 'aaa' ? 'var(--epic-orange)' : '#e280ff';
        }

        // Re-render current chapter to apply style dynamic tips instantly
        updateChapterContent(currentChapterId);
        
        // Re-render active Niagara wizard recipe
        generateWizardRecipe();
    }


    // ==========================================
    // 5. AI CHAT SYSTEM CONTROLLER
    // ==========================================
    const chatInput = document.getElementById('chatInput');
    const btnSendChat = document.getElementById('btnSendChat');
    const chatWindow = document.getElementById('chatWindow');

    function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Render user message
        appendMessage('user', '👤', '사용자', text);
        chatInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Mock AI reply
        setTimeout(() => {
            if (aiEngine) {
                const response = aiEngine.processQuery(text);
                        appendMessage('ai', '🎓', 'Unreal VFX Technical Assistant', response);
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
        }, 300);
    }

    if (btnSendChat) btnSendChat.addEventListener('click', sendChatMessage);
    
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    // Quick prompt template triggers
    const quickBtns = document.querySelectorAll('.quick-prompt-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const promptText = btn.getAttribute('data-prompt') || btn.innerText;
            if (chatInput) {
                chatInput.value = promptText;
                sendChatMessage();
                switchTab('chat');
            }
        });
    });

    function appendMessage(type, avatar, name, text) {
        if (!chatWindow) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        // Format markdown inside bubbles
        const parsedHtml = formatMarkdown(text);

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-body">
                <div class="sender-name">${name}</div>
                <div class="message-text">${parsedHtml}</div>
            </div>
        `;
        
        chatWindow.appendChild(messageDiv);
    }


    // ==========================================
    // 6. MATERIAL TECHNIQUE LIBRARY CONTROLLER
    // ==========================================
    const nodePresetBtns = document.querySelectorAll('.node-preset-btn');
    nodePresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            nodePresetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const nodePreset = btn.getAttribute('data-node');
            if (materialLab) {
                try {
                    materialLab.renderGraph(nodePreset);
                    materialLab.clearInspector(); // Reset inspector card state on preset swap
                    
                    // Reset Prompt console feedback box to default description
                    const feedback = document.getElementById('nodePromptFeedback');
                    if (feedback) {
                        feedback.className = 'console-feedback-area';
                        feedback.innerHTML = `💡 <em>"Panner Y-Speed를 -1.5로 지정해줘"</em> 또는 <em>"발광 강도를 80으로 올려줘"</em> 또는 <em>"Depth Fade 노드 추가해줘"</em>라고 지시해 보세요. 실시간으로 노드 구조와 클립보드가 갱신됩니다!`;
                    }
                } catch(e) {
                    console.error(e);
                }
            }
        });
    });

    // AI Node Prompt Console Event Listeners
    const nodePromptInput = document.getElementById('nodePromptInput');
    const btnSendNodePrompt = document.getElementById('btnSendNodePrompt');

    function sendNodePrompt() {
        if (!nodePromptInput || !materialLab) return;
        const promptText = nodePromptInput.value.trim();
        if (!promptText) return;
        
        try {
            materialLab.processPrompt(promptText);
            nodePromptInput.value = '';
        } catch (e) {
            console.error("AI Node Prompt execution error:", e);
        }
    }

    if (btnSendNodePrompt) {
        btnSendNodePrompt.addEventListener('click', sendNodePrompt);
    }

    if (nodePromptInput) {
        nodePromptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendNodePrompt();
            }
        });
    }

    const btnCopyUeNodes = document.getElementById('btnCopyUeNodes');
    if (btnCopyUeNodes) {
        btnCopyUeNodes.addEventListener('click', () => {
            if (materialLab) {
                try {
                    materialLab.copyToClipboard();
                } catch(e) {
                    console.error(e);
                }
            }
        });
    }


    // ==========================================
    // 7. NIAGARA SYSTEM PLANNER CONTROLLER
    // ==========================================
    const btnGenerateRecipe = document.getElementById('btnGenerateRecipe');
    
    function generateWizardRecipe() {
        const wizCatEl = document.getElementById('wiz-category');
        if (!wizCatEl || !niagaraWizard) return;

        const category = wizCatEl.value;
        const style = wizStyleSelect();
        const tier = wizTierSelect();
        
        const outputDiv = document.getElementById('niagaraRecipeOutput');
        if (outputDiv) {
            outputDiv.innerHTML = niagaraWizard.generate(category, style, tier);
        }
    }

    function wizStyleSelect() {
        return document.getElementById('wiz-style') ? document.getElementById('wiz-style').value : activeStyle;
    }

    function wizTierSelect() {
        return document.getElementById('wiz-tier') ? document.getElementById('wiz-tier').value : activeTier;
    }
    
    if (btnGenerateRecipe) btnGenerateRecipe.addEventListener('click', generateWizardRecipe);

    // Visual Error logger utility
    function showVisualError(errMsg) {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100%';
        div.style.background = '#ff0033';
        div.style.color = '#fff';
        div.style.padding = '15px';
        div.style.zIndex = '999999';
        div.style.fontFamily = 'monospace';
        div.style.fontSize = '14px';
        div.innerHTML = '<strong>[UnrealFX Runtime Error]</strong> ' + errMsg;
        document.body.appendChild(div);
    }
});
