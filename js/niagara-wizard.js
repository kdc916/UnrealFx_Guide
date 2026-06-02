/* js/niagara-wizard.js - Unreal Niagara Emitter Recipe Generator */

class NiagaraWizard {
    constructor() {
        this.recipes = {
            slash: {
                title: '⚔️ 나이아가라 슬래시 트레일 (Ribbon & Sprite)',
                desc: '속도감 있는 검기 슬래시 이펙트의 최적의 나이아가라 설정법입니다.',
                system: {
                    simTarget: 'CPU Simulation (정밀 연산 및 소수 파티클 구조)',
                    bounds: 'Dynamic Bounds (카메라 근접 충돌 대비)',
                    pooling: 'System Pooling: Enabled (검을 휘두를 때마다 자주 인스턴스 파괴가 일어나므로 필수)'
                },
                emitter: {
                    type: 'Ribbon Emitter + Impact Sprite Emitter',
                    spawn: 'Spawn Rate: 120 (리본 궤적이 매끄럽게 보간되도록 높은 값 적용)',
                    lifetime: '0.2s ~ 0.35s (검기는 눈 깜짝할 사이에 치고 지나가야 렉이 없고 날카롭습니다.)',
                    size: 'Ribbon Width: 15 ~ 35 (두께 보간 필수)',
                    velocity: 'Add Velocity: 캐릭터 전방 벡터 방향으로 180 ~ 300 지정'
                },
                render: {
                    module: 'Ribbon Renderer (Material: Translucent Glow Slash, Twist/Tension 활성화)',
                    facing: 'Screen (카메라 방향을 항상 마주보도록 정렬)'
                },
                stylizedTip: '🎨 **스타일라이즈드 카툰 처방**: 리본 텍스처에 Alpha 절반 그라데이션 대신, 외곽선 마스크 텍스처를 씌우고 나이아가라 Scale Color 커브에서 색상을 네온 시안(#00f0ff) 또는 네온 퍼플(#d000ff)로 잡고 Multiply 강도를 25.0 이상 줘서 눈부시게 타오르게 설정하세요.',
                realisticTip: '🎥 **AAA 콘솔 리얼리스틱 처방**: 슬래시 궤적 밑면에 충격에 따른 불꽃 불티 스프라이트 이미터(Spawn Burst 40개, Gravity 980)를 서브 스폰시켜 지면 마찰 시 리얼리티를 배가시키십시오. 또한 디스토션(Distortion/굴절) 이미터 리본을 살짝 배치하여 공기 일렁임을 유도하세요.'
            },
            
            explosion: {
                title: '💥 AAA급 시네마틱 폭발 & 잔해 (GPU Dynamic Explosion)',
                desc: '자연스러운 유체 형태의 불길, 폭발적 팽창 연기, 그리고 튀는 파편 embers의 통합 설계도입니다.',
                system: {
                    simTarget: 'GPU Compute Sim (대량 파티클 처리 필수)',
                    bounds: 'Fixed Bounds (Min -500, Max 500 고정 필수. GPU 파티클이 카메라 앵글을 벗어날 때 깜빡이며 사라지는 컬링 차단)',
                    pooling: 'System Pooling: Enabled'
                },
                emitter: {
                    type: '3-Emitter System (1. Fire/Smoke GPU, 2. Shockwave Ribbon, 3. Gravity Embers)',
                    spawn: 'Spawn Burst Instantaneous (Fire: 120개, Smoke: 250개, Embers: 300개)',
                    lifetime: 'Fire: 0.4~0.8s, Smoke: 1.5~2.8s (연기가 오랫동안 남아 상승), Embers: 1.0~2.0s',
                    size: 'Fire Size: 40~80 (점점 비대하게 팽창), Smoke Size: 80~150',
                    velocity: 'Add Velocity (Radial): 중심지 원점에서 구체형 외곽 폭발 벡터 800 ~ 1200'
                },
                render: {
                    module: 'Sprite Renderer (SubUV Animation Sheet로 프레임 시퀀스 스크롤 연동)',
                    facing: 'Face Camera (기본 카메라 마주보기)'
                },
                stylizedTip: '🎨 **스타일라이즈드 카툰 처방**: 연기 텍스처를 단순 구름처럼 귀엽게 다듬고, 머터리얼에서 Step 노드를 사용해 연기 외곽선을 날카롭게 다듬으십시오. 색상은 화염 단계별(레드->옐로우->스모크그레이) 컬러맵 보간으로 만화적 느낌을 줍니다.',
                realisticTip: '🎥 **AAA 콘솔 리얼리스틱 처방**: 지면 먼지 이미터 추가, 화염 코어 중심부에 Light Renderer 모듈 추가로 주변 벽과 캐릭터에 실시간 폭발광 조사. 파티클 충돌(Collision)에 디스턴스 필드(Distance Fields)를 매칭하여 파편들이 지면에 정밀하게 튕겨 구르는 현실감을 주십시오.'
            },
            
            portal: {
                title: '🌀 신비로운 마법 소환 포탈 (Vortex Swirl Portal)',
                desc: '나선형 소용돌이 힘으로 중심부로 빨려들어가거나 방출되는 에너지를 표현합니다.',
                system: {
                    simTarget: 'GPU Compute Sim 또는 CPU Sim 둘 다 권장 (파티클 수가 3000개 이하라면 CPU 가능)',
                    bounds: 'Dynamic Bounds',
                    pooling: 'System Pooling: Enabled'
                },
                emitter: {
                    type: 'Vortex Sprite Emitter + Runic Circle Decal',
                    spawn: 'Spawn Rate: 80 ~ 150',
                    lifetime: '1.2s ~ 2.0s (원형 궤적을 그리며 뱅글뱅글 돌아야 하므로 긴 수명 유도)',
                    size: 'Initialize Particle Size: 8 ~ 22',
                    velocity: 'Initialize Speed: 0 (Add Velocity 대신 Force 모듈을 사용해 움직임 부여)'
                },
                render: {
                    module: 'Sprite Renderer & Mesh Renderer (중심에 포탈 구체 메쉬를 작게 깔아 가시성을 확보)',
                    facing: 'Face Camera / Screen Alignment'
                },
                stylizedTip: '🎨 **스타일라이즈드 카툰 처방**: 바닥 데칼 텍스처에 귀여운 문양(룬 문자)을 얹고, 회오리치는 입자들의 텍스처를 칼날선 모양으로 다듬고 Emissive 값을 극도로 올려 신비로움을 더하세요.',
                realisticTip: '🎥 **AAA 콘솔 리얼리스틱 처방**: Vortex Force 강도 600 적용. 중심부에 Point Attraction Force를 약하게 엮어 입자가 서서히 소용돌이치며 압축 소멸하는 블랙홀 효과 유도. 머터리얼에 디스토션(Distortion) 및 투과도 깊이감(Depth Fade) 셰이더를 둘러 주변 공간을 왜곡시키십시오.'
            },
            
            hologram: {
                title: '💾 Sci-Fi Hologram Grid (홀로그램 스캔 이펙트)',
                desc: '오브젝트 실루엣에 맞춰 스마트 격자 정렬과 Ascension 펄스가 가미된 SF 이펙트입니다.',
                system: {
                    simTarget: 'GPU Compute Sim (메쉬 표면 스폰을 위해 대량 연산 필수)',
                    bounds: 'Fixed Bounds',
                    pooling: 'System Pooling: Disabled (자주 켜고 끄는 토글 방식 월드 이펙트이므로 필요에 맞춤)'
                },
                emitter: {
                    type: 'Static Mesh Location Emitter (특정 메쉬 형상을 기반으로 스폰)',
                    spawn: 'Spawn Rate: 200 ~ 500',
                    lifetime: '0.8s ~ 1.5s (깜빡이며 사라지기)',
                    size: 'Initialize Size: 2 ~ 5 (매우 얇은 전자 파편 입자)',
                    velocity: 'Linear Acceleration: Z축 방향으로 50 ~ 120 승천 속도 지정'
                },
                render: {
                    module: 'Sprite Renderer (Grid Particle / Matrix Binary 문자 셰이더 적용)',
                    facing: 'Screen Alignment'
                },
                stylizedTip: '🎨 **스타일라이즈드 카툰 처방**: 색상은 레트로 사이버펑크 핫핑크나 형광 스카이블루를 선택하고, 파티클 이미지를 0과 1의 비트 맵 문양으로 설정해 가시적인 귀여운 테크 감성을 배가시키십시오.',
                realisticTip: '🎥 **AAA 콘솔 리얼리스틱 처방**: Static Mesh Location 모듈의 \'Mesh Sampling\' 기능을 활성화하여, 실제 3D 메쉬 표면의 노멀 벡터 방향으로 미세 파티클들이 밀착 이탈하도록 물리력을 구성하고 Vector Field(벡터 필드) 노이즈를 흔들어 대기 흔들림을 사실적으로 구현해 줍니다.'
            },
            
            water: {
                title: '🌊 캐주얼/AAA 물방울 & 수면 충돌 (Fluid Ripple Splash)',
                desc: '지면과의 충돌, 물이 튀기는 고품격 연출을 위한 최적 배합 레시피입니다.',
                system: {
                    simTarget: 'CPU Simulation (지면 충돌 Raycast 제어가 수반되므로 CPU 권장)',
                    bounds: 'Dynamic Bounds',
                    pooling: 'System Pooling: Enabled'
                },
                emitter: {
                    type: 'Splash Spark Emitter + Ring Ripple Decal Emitter',
                    spawn: 'Spawn Burst Instantaneous: 20 ~ 35 (한 번에 팍 튀기는 연출)',
                    lifetime: '0.4s ~ 0.9s (빠르게 충돌 후 증발)',
                    size: 'Initialize Size: 6 ~ 14',
                    velocity: 'Add Velocity (Cone): 콘(Cone) 형태로 퍼져나가는 윗방향 속도 벡터 200 ~ 450'
                },
                render: {
                    module: 'Sprite Renderer & Ring Decal Renderer',
                    facing: 'Velocity Aligned (물이 튀어오르는 속도 벡터 방향으로 입자가 길쭉하게 늘어나도록 설정)'
                },
                stylizedTip: '🎨 **스타일라이즈드 카툰 처방**: 물방울 입자에 실제 3D 반사 표현 대신, 셰이더 단계에서 셀 셰이딩(Cel Shading)을 적용해 흰색 거품 외곽선을 덧대어 만화적인 청량함을 물씬 유도하세요.',
                realisticTip: '🎥 **AAA 콘솔 리얼리스틱 처방**: Collision(충돌) 모듈을 탑재하여 바닥과 부딪힌 물방울이 반발 계수(Restitution) 0.2로 작게 여러 번 튕기다 정밀 소멸하도록 하고, 충돌 지점에 두 번째 이미터(Sub-emitter Event Handler)로 동심원 파문 데칼(Decal Ripple) 스폰 이벤트를 트리거하여 극상의 현실감을 주십시오.'
            }
        };
    }
    
    generate(category, style, tier) {
        const recipe = this.recipes[category];
        if (!recipe) return '<p class="error">레시피를 찾을 수 없습니다.</p>';
        
        const styleTip = style === 'stylized' ? recipe.stylizedTip : recipe.realisticTip;
        const tierBadge = tier === 'aaa' ? 'High-End AAA Console' : 'Optimization Casual/Mobile';
        const simTargetValue = tier === 'aaa' ? 'GPU Compute Sim (Fixed Bounds 고정)' : 'CPU Simulation (Low Overhead)';
        
        let html = `
            <div class="recipe-card">
                <div class="recipe-header">
                    <h4>${recipe.title}</h4>
                    <span class="recipe-badge">${tierBadge}</span>
                </div>
                <div class="recipe-body">
                    <p class="recipe-tip"><strong>VFX 마스터 요약</strong>: ${recipe.desc}</p>
                    
                    <div class="recipe-section">
                        <div class="recipe-section-title">⚙️ 나이아가라 시스템 세팅 (System Properties)</div>
                        <ul class="recipe-step-list">
                            <li>연산 타깃 엔진: <strong>${simTargetValue}</strong></li>
                            <li>시스템 바운드 범위: <strong>${recipe.system.bounds}</strong></li>
                            <li>파티클 메모리 풀링: <strong>${recipe.system.pooling}</strong></li>
                        </ul>
                    </div>

                    <div class="recipe-section">
                        <div class="recipe-section-title">🌀 이미터 파라미터 (Emitter & Particle Modules)</div>
                        <ul class="recipe-step-list">
                            <li>이미터 레이아웃: <strong>${recipe.emitter.type}</strong></li>
                            <li>스폰 속도 (Spawn Rate): <strong>${recipe.emitter.spawn}</strong></li>
                            <li>파티클 수명 (Lifetime): <strong>${recipe.emitter.lifetime}</strong></li>
                            <li>파티클 크기 (Size): <strong>${recipe.emitter.size}</strong></li>
                            <li>물리 초기 속도 (Velocity): <strong>${recipe.emitter.velocity}</strong></li>
                        </ul>
                    </div>

                    <div class="recipe-section">
                        <div class="recipe-section-title">🎨 렌더러 모듈 구성 (Renderers)</div>
                        <ul class="recipe-step-list">
                            <li>사용 렌더러 (Renderer): <strong>${recipe.render.module}</strong></li>
                            <li>입자 정렬 기준 (Facing): <strong>${recipe.render.facing}</strong></li>
                        </ul>
                    </div>

                    <div class="recipe-section">
                        <div class="recipe-section-title">🌟 스타일 및 플랫폼 맞춤 마스터 피드백</div>
                        <div class="recipe-tip" style="border-left: 4px solid var(--epic-orange);">
                            ${styleTip}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }
}
