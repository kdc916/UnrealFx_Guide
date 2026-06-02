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
                                 data-formula="${t.formula.toLowerCase()}">
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
            
            glossaryCards.forEach(card => {
                const subcat = card.getAttribute('data-subcat');
                const term = card.getAttribute('data-term');
                const def = card.getAttribute('data-def');
                const why = card.getAttribute('data-why');
                const platform = card.getAttribute('data-platform');
                const formula = card.getAttribute('data-formula');

                const matchesPill = (activeSubCat === '전체' || subcat === activeSubCat);
                const matchesSearch = (!query || 
                                       term.includes(query) || 
                                       def.includes(query) || 
                                       why.includes(query) || 
                                       platform.includes(query) || 
                                       formula.includes(query));

                if (matchesPill && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Keyup input listener for live search filter
        if (docChapterSearch) {
            docChapterSearch.addEventListener('input', filterGlossary);
        }

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

        lines.forEach(line => {
            line = line.trim();

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
        return line
            .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
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
        const decalKeys = ['데칼', 'decal', 'dbuffer', '탄흔', '마법진'];
        const dissolveKeys = ['디졸브', 'dissolve', '소멸', 'fade', 'erosion'];
        const elementalKeys = ['화염', '불', 'fire', '물', 'water', '번개', 'lightning', '바람', 'wind', '얼음', 'ice', '원소'];

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
