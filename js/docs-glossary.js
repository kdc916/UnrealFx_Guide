/* js/docs-glossary.js - Unreal Master VFX Glossary Database & Search Logic */

class DocsGlossary {
    constructor() {
        this.terms = [
            // ==========================================
            // NIAGARA MODULES (Chapter 4)
            // ==========================================
            {
                term: 'Initialize Particle (파티클 초기화)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '파티클이 스폰되는 첫 프레임에 결정되는 Lifetime(수명), Color(색상), Sprite Size(크기), Mass(질량) 등의 필수 초깃값을 난수 또는 상수로 주입하는 나이아가라의 기본 뼈대 모듈입니다.',
                why: '모든 파티클은 수명과 비주얼 형태가 정의되어야 렌더링되므로 이미터의 초입에 반드시 엮어주어야 작동 환경이 성립됩니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 필수 모듈',
                formula: '수명 (0.8s ~ 1.5s 무작위 분포), 스프라이트 크기 (25.0 ~ 65.0 균등 배합) ➡️ 기본 파편 및 불꽃 입자 설정.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#initializeparticle'
            },
            {
                term: 'Add Velocity (속도 추가)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '파티클 생성 즉시 임의의 3차원 속도 벡터(X, Y, Z)를 가중 주입하여 특정 방향으로 속도와 방향성을 주어 발사 이동시킵니다.',
                why: '폭발 잔해나 비산 불티가 물리적으로 뿜어져 나가는 기조 운동력을 부여하기 위해 엮어줍니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 연산 지원',
                formula: 'Add Velocity (Linear X: -50~50, Y: -50~50, Z: 200~350) ➡️ 사방으로 분출되며 위로 솟구치는 분수형 불꽃.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#addvelocity'
            },
            {
                term: 'Add Velocity in Cone (콘 각도 속도 추가)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '지정된 원뿔(Cone) 기둥 형태의 물리 앵글 범위를 조율하여, 그 안에서 파티클이 부채꼴 각도로 뿜어 퍼지듯이 발사 운동력을 주입합니다.',
                why: '피격 이펙트의 핏방울이나 총구 화염 스파크처럼 일정한 부채꼴 각도로 잔해가 뿜어지는 기하학적 범위를 제어하기 위해 엮어줍니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 경량 연산 구성',
                formula: 'Velocity Strength (300~500), Cone Angle (45.0), Axis (0,0,1) ➡️ 캐릭터 타격 방향에 맞춰 뿜어지는 피격 선혈 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#addvelocityincone'
            },
            {
                term: 'Collision (충돌 처리)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클이 움직하다가 지면이나 벽면(World Static/Dynamic 콜리전 채널)과 만났을 때 튕겨 나가거나 멈추는 물리 충돌 연산을 가동합니다.',
                why: '파편이나 물방울 등이 땅에 묻히지 않고 표면에 튕기거나 잔류하는 현실적인 2차 상호작용을 구현하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 단, 1만 개 이상의 GPU 파티클 충돌은 모바일 기기 발열 초래',
                formula: 'Bounce Coefficient (0.45), Friction (0.35) ➡️ 땅에 부딪혀 통통 튀다가 마찰력으로 서서히 멈추는 돌 파편 이펙트.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#collision'
            },
            {
                term: 'Generate Collision Event (충돌 이벤트 생성)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클이 장애물에 충돌하는 순간, 해당 충돌 지점의 3차원 위치(Position) 및 지면 법선(Normal) 정보를 이벤트 데이터로 송출합니다.',
                why: '충돌한 정확한 벽면 위치에 데칼을 남기거나 충돌부에서 미세 먼지 파티클(Event Handler 연동)을 2차 재생성하기 위함입니다.',
                platform: 'PC, 콘솔 권장 - CPU/GPU 이벤트 전송 오버헤드로 저사양 모바일 기기 프레임 드랍 유발 가능',
                formula: 'Generate Collision Event (Event Name: "WallHit") ➡️ Collision Event Handler -> Spawn Decal 모듈 연동으로 지면 탄흔 프로젝션.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#generatecollisionevent'
            },
            {
                term: 'Dynamic Parameter (다이내믹 파라미터)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '나이아가라 내부 변수(Age, Size, Curve)를 그래픽카드로 전달하여 머터리얼 내의 Dynamic Parameter 노드에 실시간 연결(R, G, B, A 채널)합니다.',
                why: '파티클 수명에 맞춰 머터리얼의 디졸브를 깎아내거나, Emissive 발광 강도를 폭발적으로 키우는 등 셰이더 상태를 프레임 단위로 원격 제어하기 위해 연결합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 셰이더 연동 필수 모듈',
                formula: 'Param R ➡️ Material "Grow_Radius", Param G ➡️ Material "Dissolve_Amount" (0.0에서 1.0으로 수명 기준 매핑).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#dynamicparameter'
            },
            {
                term: 'Apply Gravity (중력 가속도)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '시간의 흐름에 따라 파티클의 Z축 속도를 중력 가속도(기본 -980.0)로 강제 누적 가산합니다.',
                why: '모든 발사체, 물방울, 중석 잔해가 지구 중력을 받아 포물선을 그리며 낙하하는 자연스러운 낙하 궤적을 제어하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 연산 오버헤드 거의 없음',
                formula: 'Gravity Magnitude (980.0) * Solve Forces ➡️ 하늘로 높이 날아올랐다가 서서히 하강해 바닥으로 떨어지는 화포 폭파 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#gravityforce'
            },
            {
                term: 'Drag (대기 저항)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클 속도에 비례하는 대기 공기 저항 감쇠력(Drag)을 실시간으로 역방향 가해 파티클을 부드럽게 감속시킵니다.',
                why: '이펙트가 폭발적으로 터진 뒤 끝없이 뻗어 나가지 않고 공기 저항에 부딪혀 뭉게구름처럼 제자리에 부드럽게 감속되며 멈추는 리얼한 유체 움직임을 유도합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 경량 물리 적용 가능',
                formula: 'Drag Coefficient (1.5) ➡️ 비산되던 파편들이 터진 후 0.5초 안에 급격히 감속하며 연기 속으로 수렴하는 묘사.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#drag'
            },
            {
                term: 'Vortex Force (와류/소용돌이 힘)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '지정된 회전축(Origin / Normal)을 중심으로 파티클을 둥글게 소용돌이치게 만드는 원형 구심 벡터 힘을 가합니다.',
                why: '소환 마법진의 마법 구체, 혹은 태풍/블랙홀처럼 중심으로 모든 에너지가 회전하며 말려 들어가는 볼텍스(Vortex) 운동을 설계하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 수학적 회전 연산 가속',
                formula: 'Vortex Force Amount (600.0), Axis (0,0,1) ➡️ 바닥 마법진 주변으로 마력이 원형 회오리를 치며 상승하는 비주얼.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#vortexforce'
            },
            {
                term: 'Wind Force (자연풍)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '일정한 풍향 벡터 방향으로 지속적인 기류 압력을 가해 입자들을 밀어냅니다.',
                why: '나뭇잎, 불티, 연기 구름 등이 월드 내 부는 자연풍에 날리는 대기 기류 표현에 사용됩니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 벡터 가산',
                formula: 'Wind Force (300, -100, 0) ➡️ 바람에 의해 우측 대각선으로 자연스럽게 휘날리는 연기 구름.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#windforce'
            },
            {
                term: 'Scale Color (색상/알파 보간)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클의 수명 진척도(Age/Lifetime)에 매핑된 커브를 기반으로, 색상(RGB) 및 불투명도(Alpha)를 곱해 줍니다.',
                why: '파티클이 생성될 땐 불투명하다가 수명이 끝날 무렵 부드럽게 투명해지며 사라지는 (Alpha Fade Out) 필수 소멸 연산을 위해 주입합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 비주얼 라이프사이클 필수',
                formula: 'Alpha Curve (0.0s ➡️ 0.0, 0.2s ➡️ 1.0, 0.8s ➡️ 1.0, 1.0s ➡️ 0.0) ➡️ 깜빡임 없이 스르륵 생성되어 사라지는 먼지.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scalecolor'
            },
            {
                term: 'Scale Sprite Size (스프라이트 크기 보간)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '시간의 흐름에 따라 파티클의 Sprite 가로/세로 크기 비율을 유동적으로 제어합니다.',
                why: '에너지 구체가 터질 때 급격히 부풀어 올랐다가 사그라들거나, 불꽃이 위로 올라가며 점차 작아져 연기로 식는 물리 형태를 구현하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 가로세로 스케일링',
                formula: 'Size Curve (0.0s ➡️ 0.5, 0.3s ➡️ 1.5, 1.0s ➡️ 0.0) ➡️ 생성 시 급팽창 후 사라질 땐 뾰족하게 소멸하는 화염 기포.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scalespritesize'
            },
            {
                term: 'Solve Forces and Velocity (솔버 노드)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '이전에 가해진 중력, 바람, 마찰, 가속 등 모든 물리적인 힘(Forces)과 속도(Velocity)를 연립 적분 계산하여 매 프레임 파티클의 최종 3D 좌표를 확정하는 필수 솔버(Solver) 모듈입니다.',
                why: '최종 위치 계산판입니다. 이 모듈이 업데이트 단계의 최하단에 위치하지 않으면 이미터의 물리 연산 결과가 화면에 전혀 투영되지 않습니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 필수 최종 솔버',
                formula: '파티클 업데이트 파이프라인의 맨 마지막 단계에 고정 탑재.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#solveforcesandvelocity'
            },
            {
                term: 'Jitter Position (절차적 흔들림)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클의 실제 위치 좌표에 난수 기반의 미세 오프셋을 매 프레임 더해주어 불규칙하게 진동하도록 유도합니다.',
                why: '전기 스파크나 번개 줄기 리본 궤적이 지그재그로 미친 듯이 떨리며 내려오는 거동을 연산하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 난수 흔들림 제어',
                formula: 'Jitter Amount (X, Y, Z: 15~35) ➡️ 구불구불 흐르는 네온 전기 스파크 아크.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#jitterposition'
            },
            {
                term: 'Curl Noise Force (컬 노이즈 유체)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '절차적 Curl Noise 수학 필드를 가동하여, 파티클이 유체역학처럼 불규칙하게 소용돌이치며 비선형으로 흔들리는 힘을 가합니다.',
                why: '대형 유체 시뮬레이션 없이도, 불티나 가벼운 연기가 공중에서 꼬이며 승화하는 유기적인 비행 패턴을 가속하기 위해 사용합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 단, 모바일 기기는 GPU 가속 Sim Target 필수 지정 권장',
                formula: 'Noise Strength (250), Noise Frequency (15.0) ➡️ 공중을 맴돌며 가볍게 흩날리는 불티 입자 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#curlnoiseforce'
            },
            {
                term: 'Point Force (구심점/원심력)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '특정 공간 좌표점을 기준으로 사방으로 밀쳐내거나(원심력) 중심으로 빨아들이는(구심력) 물리 벡터 힘을 발생시킵니다.',
                why: '마력 방출 충격이나 소용돌이 중심부로 잔해들이 빨려 들어가는 임팩트 연출에 적합합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 중심축 방향 가중',
                formula: 'Force Strength (-800.0) ➡️ 블랙홀 구심력 중심으로 급격히 빨려 드는 파편 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#pointforce'
            },
            {
                term: 'Sample Static Mesh (메쉬 표면 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '지정된 스태틱 메쉬의 삼각 폴리곤(Triangles) 표면 좌표와 노멀 정보를 추출해, 그 표면 위에서 파티클이 스폰되도록 바인딩합니다.',
                why: '캐릭터가 디졸브되며 소멸할 때, 캐릭터 외곽 뼈대 형태에 맞춰 불꽃이나 홀로그램 먼지를 고스란히 흘려보내기 위함입니다.',
                platform: 'PC, 콘솔 권장 - 모바일은 실시간 메쉬 버텍스 데이터 읽기로 인한 CPU 연산 부하 주의 필요',
                formula: 'Mesh Sampling: Dynamic Static Mesh Parameter ➡️ 소환사의 몸 형태를 따라 타오르며 흩어지는 빛의 가루.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#samplestaticmesh'
            },
            {
                term: 'SubUV Animation (서브UV 시퀀스 재생)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '이미터 수명에 연계되어 Sprite 렌더러가 여러 장(e.g., 8x8)의 프레임이 합쳐진 시트 텍스처를 애니메이션 프레임 단위로 쪼개서 출력하도록 조율합니다.',
                why: '화염 구름이나 불꽃의 세부 디테일을 단순 2D가 아닌 리얼한 가스 팽창 프레임 애니메이션으로 렌더링하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 스프라이트 시트 플립북 재생',
                formula: 'SubUV Image Size (8x8), SubUV Loop Count (1) ➡️ 64프레임 동안 실시간 팽창하며 번지는 고해상도 폭발 구름.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#subuvanimation'
            },
            {
                term: 'Ribbon Renderer (리본 궤적 렌더러)',
                cat: 'niagara',
                catName: '나이아가라 렌더러',
                def: '생성된 파티클의 3차원 이동 동선을 하나의 연속된 긴 가닥(Strip) 면으로 이어 그리는 렌더링 장치입니다.',
                why: '검을 휘두를 때 뻗어 나오는 잔상(Ribbon Trail), 궤적 스파크 등을 표현하기 위해 탑재합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 연속 정렬 면 생성',
                formula: 'Ribbon Facing: Camera, Ribbon Width (15.0) ➡️ 부드러운 호를 그리며 꼬리를 흘리는 휘황찬란한 검기 잔상.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#ribbonrenderer'
            },
            {
                term: 'Mesh Renderer (메쉬 렌더러)',
                cat: 'niagara',
                catName: '나이아가라 렌더러',
                def: '2D 이미지가 아닌 실제 3D 메시(Mesh 에셋) 폴리곤 데이터를 파티클 각각의 위치마다 뿜어 스폰시키는 고체형 렌더러입니다.',
                why: '빙결 마법의 고체 얼음 기둥 파편, 혹은 폭발 시 사방으로 튕겨 나가는 입체적인 돌가루/나무 토막 파편을 표현하기 위해 사용합니다.',
                platform: 'PC, 콘솔 권장 - 모바일은 3D 메쉬의 높은 드로우콜과 폴리곤 병목으로 인한 대폭 성능 하락 주의',
                formula: 'Static Mesh: SM_Rock_Debris, Mesh Scale Parameter ➡️ 지면 강타 시 솟구쳐 오르는 입체 바위 파편.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#meshrenderer'
            },
            {
                term: 'Light Renderer (포인트 라이트 렌더러)',
                cat: 'niagara',
                catName: '나이아가라 렌더러',
                def: '파티클이 위치하는 3차원 좌표마다 동적인 포인트 라이트(Point Light) 광원을 생성하여 주변 캐릭터나 땅 표면에 실시간 불빛을 조사합니다.',
                why: '실제 폭발이 터질 때 주변 지형이 함께 노란 불빛으로 밝아지는 고퀄리티 AAA급 실사 시각 연출을 완성하기 위해 사용합니다.',
                platform: '하이엔드 PC, 콘솔 전용 - 모바일 사용 절대 금지 (각 파티클마다 실시간 동적 그림자/라이트 연산은 모바일 렉 유발 1순위)',
                formula: 'Light Radius Scale (350.0), Color (주황 형광) ➡️ 폭사 시 주변 어두운 동굴 지형이 순간 번쩍 밝아지는 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#lightrenderer'
            },
            {
                term: 'Spawn Rate (스폰율)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '초당 생성할 파티클의 개수를 조절하여 지속적이고 안정적인 흐름을 생성하는 이미터 업데이트의 핵심 모듈입니다.',
                why: '연기, 폭풍, 물의 흐름처럼 끊임없이 비산하는 이미터를 형성하기 위한 필수 동력 장치입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 지속 스폰 제어',
                formula: 'Spawn Rate (150) ➡️ 실시간으로 계속 방출되는 부드러운 안개 및 아지랑이 연기.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spawnrate'
            },
            {
                term: 'Spawn Burst Instantaneous (즉각 버스트 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '지정된 타임라인의 단 1프레임(스폰 시점)에 수십~수백 개의 파티클을 일시에 폭발적으로 생성합니다.',
                why: '타격 순간 피격 스파크, 지면 폭발 파편처럼 단발성의 강력한 충격을 묘사할 때 탑재합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 단발성 버스트 가속',
                formula: 'Spawn Count (75) ➡️ 캐릭터 피격 순간 사방으로 일시에 튀는 칼날 불꽃.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spawnburstinstantaneous'
            },
            {
                term: 'Scale Mesh Size (메쉬 크기 보간)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '메쉬 렌더러가 활성화되었을 때, 개별 3D 메쉬의 X, Y, Z축 크기 배율을 수명 곡선에 따라 보간 제어합니다.',
                why: '얼음 송곳이 뾰족하게 길어지며 솟구치거나, 돌가루 파편이 바닥에 뒹굴며 서서히 작아지는 입체 형태를 잡기 위함입니다.',
                platform: 'PC, 콘솔 권장 - 모바일 기기는 다차원 벡터 크기 변형 연산 최소화 필요',
                formula: 'Mesh Scale Factor (0.0s ➡️ 0,0,0, 0.2s ➡️ 1,2,1, 1.0s ➡️ 0,0,0) ➡️ 날카롭게 돌출되었다가 사라지는 대지 균열 파편.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scalemeshsize'
            },
            {
                term: 'Sphere Location (구체 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '지정한 반지름을 가진 3차원 구체(Sphere)의 표면 또는 내부 임의의 위치에서 파티클이 태어나도록 좌표를 강제 배치합니다.',
                why: '구형 보호막 주변의 마법 입자, 캐릭터 주변으로 둥글게 퍼져나가는 후광 에너지의 베이스 라인을 잡기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 기본 기하 영역 계산',
                formula: 'Sphere Radius (150.0), Spawn Area: Surface Only ➡️ 에너지 쉴드 겉 표면에서 맴도는 신비로운 룬 문자 이펙트.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spherelocation'
            },
            {
                term: 'Box Location (박스 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '지정한 가로, 세로, 높이(X, Y, Z Dimension) 크기를 가진 직육면체 박스 공간 내에서 파티클들을 무작위 스폰합니다.',
                why: '일정한 맵 영역에 내리는 비/눈, 혹은 특정 지면 사각형 범위 내에서 아지랑이가 피어오르는 기하학적 범위를 묶기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 경량 위치 배치',
                formula: 'Box Size (500, 500, 50), Location Offset (Z: 250) ➡️ 지정 구역 하늘에서 빗방울이 골고루 낙하하는 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#boxlocation'
            },
            {
                term: 'Update Age (나이아가라 에이지 업데이트)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '매 프레임 파티클의 누적 수명(Age)을 실시간 갱신하고, 수명이 Lifetime을 초과하면 파티클을 소멸 처리하는 라이프사이클 엔진 모듈입니다.',
                why: '이 모듈이 누락되면 파티클이 수명을 다해도 소멸하지 않고 영구히 메모리에 남아 누적 렉을 유발합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 생명 주기 필수 모듈',
                formula: '파티클 업데이트 파이프라인의 필수 최상단 탑재.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#updateage'
            },
            {
                term: 'Set Variables (변수 강제 주입)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '사용자가 지정한 사용자 변수(User Namespace)나 파티클 자체 변수를 특정 공식, 난수, 또는 블루프린트 수치로 강제 오버라이드합니다.',
                why: '나이아가라 외부의 블루프린트 데이터(캐릭터 속도, 체력 등)를 받아 머터리얼이나 파티클 로직에 동적으로 전달하기 위한 연결 고리입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 파라미터 연동 고리',
                formula: 'Set User.LavaColor (RGB) ➡️ 외부 매개변수로 화염의 색상 속성을 실시간 오버라이드.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#setvariables'
            },
            {
                term: 'Sprite Renderer (스프라이트 렌더러)',
                cat: 'niagara',
                catName: '나이아가라 렌더러',
                def: '파티클 좌표마다 지정된 2D 텍스처 이미지를 카메라 방향을 항상 마주보는 2D 판넬(Quad) 형태로 고속 드로잉합니다.',
                why: '대부분의 먼지, 불꽃, 전기, 타격 스파크 등 VFX의 기본 비주얼 판을 그리는 가장 범용적인 핵심 렌더러입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 표준 드로잉 렌더러',
                formula: 'Alignment: Screen, Facing Mode: Face Camera ➡️ 카메라를 돌려도 정면이 온전히 유지되는 대기 안개.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spriterenderer'
            },
            {
                term: 'Cylinder Location (실린더 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '원기둥(Cylinder) 형태의 3D 반경과 높이를 제어하여, 그 원기둥 표면이나 내부 영역에서 파티클이 생성되도록 위치를 배치합니다.',
                why: '캐릭터 다리 주변에서 상승하는 회오리 기둥, 지면에서 기둥 모양으로 솟구치는 화염 분출의 시발점을 설계할 때 유용합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 원기둥 좌표 배치',
                formula: 'Cylinder Radius (80.0), Cylinder Height (200.0) ➡️ 지면에서 원통 형태로 고르게 솟아오르는 마법 포탈 오라.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#cylinderlocation'
            },
            {
                term: 'Torus Location (토러스 도넛 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '도넛 모양의 3D 링(Torus) 영역을 따라 파티클들의 스폰 위치를 정밀 분산 배정합니다.',
                why: '완벽한 링 모양으로 뻗어나가는 충격파 잔해나, 캐릭터 허리 주위를 고리 형태로 도는 마법 궤적을 생성할 때 사용합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 도넛 링 좌표 배치',
                formula: 'Large Radius (120.0), Handle Radius (10.0) ➡️ 발 밑에 정원형으로 생성되어 퍼지는 링 형태의 기류 잔해.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#toruslocation'
            },
            {
                term: 'Line Location (선형 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '3차원 공간 상의 시작점(Start)과 끝점(End)을 잇는 가상의 1차원 선분을 기준으로 입자들을 나란히 배치하여 태어나게 합니다.',
                why: '레이저 빔의 줄기, 혹은 장벽 겉면에서 나란히 뿜어 나오는 스파크 장벽 등을 일렬로 배치할 때 장착합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 선형 좌표 오프셋',
                formula: 'Start (0, 0, 0), End (0, 0, 500) ➡️ 바닥에서 하늘로 일직선으로 연달아 태어나는 번개 빛 기둥.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#linelocation'
            },
            {
                term: 'Cone Location (원뿔 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '원뿔(Cone) 형태의 공간 각도와 높이를 기준으로 원뿔 끝점이나 밑면 원형 공간 내에 입자 스폰 위치를 장착합니다.',
                why: 'Add Velocity in Cone과 연동하여 총구에서 부채꼴로 튀는 불꽃이나 용 분화구에서 사방 부채꼴로 튀는 파편의 시작점을 묶을 때 씁니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 부채꼴 원뿔 좌표 세팅',
                formula: 'Cone Angle (30.0), Cone Length (100.0) ➡️ 원뿔 방출 각도 내부에서만 생성되어 비산하는 피격 이펙트.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#conelocation'
            },
            {
                term: 'Grid Location (격자 영역 스폰)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '3D 바둑판 격자(Grid)의 X, Y, Z축 분할 크기 및 오프셋에 입자들을 오차 없이 칼같이 정렬해 대량 동시 스폰합니다.',
                why: 'SF 장벽의 디지털 스캔라인, 스마트 홀로그램 화면, 또는 테크니컬한 행렬 물리 시뮬레이션의 베이스 좌표계를 칼정렬할 때 유용합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 3D 격자 행렬 스폰',
                formula: 'Grid Dimensions (10 x 10 x 1), Grid Space (20.0) ➡️ 정밀한 디지털 사각형 격자 패턴의 실드 보호막.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#gridlocation'
            },
            {
                term: 'Skeletal Mesh Sampling (스켈레탈 메쉬 샘플링)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '실시간 애니메이션이 적용되어 움직이는 캐릭터(Skeletal Mesh)의 특정 본(Bones) 위치나 표면 버텍스(Vertices) 좌표를 실시간 추적해 파티클을 스폰시킵니다.',
                why: '캐릭터가 달릴 때 발등 본에서 불이 붙어 궤적을 그리거나, 몸통 스킨 전체가 불타며 재가 날리는 역동적인 캐릭터 일체형 연출에 활용됩니다.',
                platform: 'PC, 콘솔 전용 - 모바일은 뼈대 애니메이션 실시간 버텍스 GPU 계산량 증가로 프레임 드랍 병목 유발 (모바일 사용 비권장)',
                formula: 'Skeletal Mesh Source: CPU/GPU Mesh Data, Sample Bone Name: "hand_l" ➡️ 왼손 뼈대에서 은은하게 샘플링되어 피어오르는 저주 연기.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#skeletalmeshsampling'
            },
            {
                term: 'Generate Death Event (사망 이벤트 생성)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '개별 파티클이 수명을 다하여 소멸(Death)하는 정확한 최후 프레임에 소멸 지점의 3차원 위치(Position) 및 속도 벡터를 이벤트 데이터로 발송합니다.',
                why: '하늘로 솟구친 불꽃이 폭발해 사라질 때 사방으로 퍼지는 2차 불꽃(Ember Burst)을 생성하거나, 물방울이 소멸할 때 바닥에 물웅덩이를 스폰하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 단, 모바일 기기는 프레임당 사망 이벤트 개수가 과다할 시 이벤트 버퍼 오버플로우 주의',
                formula: 'Generate Death Event (Event Name: "OnDeath") ➡️ Death Event Handler 바인딩으로 폭발 탄두 소멸 순간 비산 불티 폭발.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#generatedeathevent'
            },
            {
                term: 'Receive Event (이벤트 수신/핸들러)',
                cat: 'niagara',
                catName: '나이아가라 스폰',
                def: '동일 시스템 내 다른 이미터가 보낸 Collision Event나 Death Event 신호를 받아, 해당 이벤트가 발생한 좌표에서 파티클을 즉각 스폰 및 구동시킵니다.',
                why: '이미터 간의 1차-2차 연쇄 물리 작용(총알 충돌 ➡️ 스파크 폭발)을 수학적인 위치 계산 없이 프레임 단위로 즉각 연동하기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 이미터 간 상호작용 제어',
                formula: 'Event Source: "WallHit", Event Handler: Spawn Number (15개) ➡️ 메인 입자 충돌 좌표에서 즉각 터지는 잔해 스파크.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#receiveevent'
            },
            {
                term: 'Export Particle Data (파티클 데이터 내보내기)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: 'GPU/CPU 내 연산 중인 특정 파티클들의 실시간 위치, 속도, 수명 배열 데이터를 게임의 블루프린트(Blueprint) 및 C++ 코드로 역전송합니다.',
                why: '파티클이 날아가다 적 캐릭터에게 충돌하면 실제 데미지를 계산하게 하거나, 파티클 위치에 동적으로 콜리전 액터를 동반 생성하는 특수 TA 시스템 구현에 쓰입니다.',
                platform: 'PC, 콘솔 권장 - GPU 메모리에서 CPU 메모리로의 프레임별 역방향 전송(Readback) 오버헤드가 커 모바일 플랫폼 비권장',
                formula: 'Export Particle Data Interface ➡️ 파티클 궤적 좌표를 언리얼 블루프린트 컴포넌트 위치로 전달해 충돌 액터 생성.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#exportparticledata'
            },
            {
                term: 'Orient to Vector (벡터 방향 정렬)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클의 2D 스프라이트나 3D 메쉬의 앞면/윗면 정렬 각도를 현재 이동하고 있는 속도 벡터(Velocity) 또는 지정된 특정 벡터 방향으로 강제 회전시켜 눕힙니다.',
                why: '날아가는 불티나 불꽃이 비행 궤적 방향을 향해 뾰족하게 누워 날아가거나, 사방으로 튀는 불꽃이 중심에서 외곽으로 발사되는 방향을 보게끔 정렬해 속도감을 돋우기 위함입니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 수학적 방향 정렬 가속',
                formula: 'Orient to Vector: Velocity, Axis: Z-Axis ➡️ 날아가는 투사체 속도 축에 맞춰 눕혀진 번개 화살 스프라이트.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#orienttovector'
            },
            {
                term: 'Scale Ribbon Width (리본 두께 보간)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: 'Ribbon Renderer가 활성화되었을 때, 리본 궤적의 폭(Width)을 파티클의 수명이나 진행 거리 곡선을 기반으로 제어합니다.',
                why: '칼바람 검기가 시작점은 두껍다가 꼬리 끝부분으로 갈수록 칼날처럼 뾰족하고 얇아지며 사라지는 유려한 형태를 구현합니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 리본 두께 엣지 제어',
                formula: 'Ribbon Width Curve (0.0s ➡️ 1.0, 0.8s ➡️ 1.0, 1.0s ➡️ 0.0) ➡️ 날카롭게 가늘어지며 소멸하는 기류 칼날.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scaleribbonwidth'
            },
            {
                term: 'Camera Offset (카메라 오프셋)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '파티클의 실제 3D 물리 위치 좌표는 유지하되, 화면에 렌더링되는 픽셀 깊이를 카메라 방향(Camera View Vector) 쪽으로 끌어당기거나 뒤로 밉니다.',
                why: '반투명 먼지 파티클이 캐릭터 몸뚱아리나 바닥 지형지물을 뚫고 지나갈 때 경계면이 얇게 깜빡거리거나 끊기는 제트파이팅(Z-Fighting) 현상을 방지해 줍니다.',
                platform: '모든 플랫폼 (PC, 콘솔, 모바일) - 화면 렌더 뎁스 보정',
                formula: 'Camera Offset (5.0 ~ 15.0) ➡️ 캐릭터 스킨을 침범하지 않고 미려하게 겹쳐서 출력되는 충격파 포그.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#cameraoffset'
            },
            {
                term: 'Sample Texture (텍스처 샘플링)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '2D 텍스처 에셋의 RGBA 색상 데이터를 파티클 스폰 영역 좌표에 대입 샘플링하여, 파티클 각각의 색상이나 크기 오프셋에 대입합니다.',
                why: '지정된 불꽃 사진의 흑백 마스크 세기에 맞춰 특정 부분에서만 파티클을 뿜어내거나, 맵 이미지 색대로 파티클 컬러를 자동 염색할 때 유용합니다.',
                platform: 'PC, 콘솔 권장 - 모바일 플랫폼은 매 프레임 GPU 텍스처 픽셀 조회를 수행할 시 대역폭 지연 현상(Bandwidth Stall) 초래 주의',
                formula: 'Sample Texture: T_Noise_Map, Attribute Match: Color ➡️ 안개 텍스처 모양을 고스란히 본뜬 밀도 분포 파티클 스폰.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#sampletexture'
            },
            {
                term: 'Sample Pseudo Volume (의사 볼륨 텍스처 샘플링)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '2D 평면에 바둑판으로 잘라 붙인 3차원 볼륨 텍스처(Pseudo Volume) 슬라이스들을 물리적 3D 입체 데이터로 복원하여 파티클의 3차원 움직임 벡터에 대입합니다.',
                why: '매우 무거운 실시간 3D 유체 시뮬레이션 없이도, 입체 유체 노이즈 기류를 머금은 AAA급 볼류메트릭 연기 기둥을 연산 속도 저하 없이 구현합니다.',
                platform: 'PC, 콘솔 전용 - 저사양 모바일 플랫폼 작동 불가 (고성능 볼륨 셰이딩 및 고대역폭 메모리 필수)',
                formula: 'Pseudo Volume Texture: V_Smoke_Density ➡️ 실제 기체처럼 입체적으로 구부러지고 감도는 사실적인 연기 기둥.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#samplepseudovolume'
            },
            {
                term: 'Fluid Simulation (유체 시뮬레이션 그리드)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '나이아가라 내부에서 실시간으로 2D/3D 네이비어-스토크스 유체 물리 방정식 격자를 가동하여, 연기와 먼지가 주변 캐릭터나 지형 장애물에 부딪히며 휘감아 도는 리얼 유체 물리 효과를 연산합니다.',
                why: '마법 장벽을 치거나 물방울이 폭발할 때, 기류가 장애물 뒤로 굽어돌며 흘러가는 물리 기반 시각 효과를 극대화하기 위해 사용합니다.',
                platform: '하이엔드 PC, 콘솔 전용 - 모바일 사용 절대 불가 (막대한 GPU 스레드 점유 및 메모리 연산으로 프레임 드랍 유발)',
                formula: 'Niagara Fluid Simulation Grid 2D/3D ➡️ 캐릭터 손동작 궤적을 따라 일렁이며 흩어지는 실제 가스 연기 시뮬레이션.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-fluids-reference'
            },
            {
                term: 'Distance Field Collision (디스턴스 필드 충돌)',
                cat: 'niagara',
                catName: '나이아가라 업데이트',
                def: '언리얼 엔진의 월드 글로벌 디스턴스 필드(Global Distance Field) 볼륨 데이터를 실시간으로 읽어와, 파티클이 지형 바위나 임의의 동적 장애물과 만났을 때 정확한 3차원 충돌 반사 연산을 가속합니다.',
                why: '복잡한 메쉬 콜리전 오버헤드를 0으로 떨어뜨리고, 수십만 개의 불티가 절벽이나 동굴 지형 굴곡을 따라 통통 튀는 극사실 물리 충돌을 처리하기 위해 엮어 줍니다.',
                platform: '하이엔드 PC, 콘솔 전용 - 모바일 기기 사용 불가 (Lumen 라이팅 기저에 깔린 Distance Field 옵션 활성화 필수)',
                formula: 'Collision Type: Distance Field ➡️ 수만 개의 용암 불티 파편이 동굴 지면 굴곡을 따라 바스러지며 튕겨나가는 물리.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#distancefieldcollision'
            },
            // ==========================================
            // MATERIAL NODES (Chapter 5)
            // ==========================================
            {
                term: 'Texture Coordinate (TexCoord / 텍스처 좌표)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '물체 표면에 텍스처를 투사할 때 쓰이는 기본 2차원 공간 매핑 좌표계(U, V) 축 정보입니다.',
                why: '텍스처를 얹거나, UV 좌표를 분해하여 가로/세로 방향의 일방향 그라데이션 마스크를 설계하기 위한 필수 인덱스 노드입니다.',
                formula: 'TexCoord.U ➡️ One Minus ➡️ 검기 리본의 뒤쪽으로 갈수록 투명도가 깎이는 선형 마스크.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#texturecoordinate'
            },
            {
                term: 'Panner (패너 스크롤)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '시간의 흐름에 연계하여 UV 좌표를 가로(U) 또는 세로(V) 축 방향으로 연속해서 흐르게(Scroll) 보정합니다.',
                why: '물이 흐르거나, 에너지가 뿜어 올라가고, 용암이 울렁이며 쓸려 내려가는 등의 절차적 유체 유동감을 주기 위해 엮어줍니다.',
                formula: 'Speed X (0.3), Speed Y (-0.5) ➡️ 좌상단 대각선으로 흘러가며 이글거리는 에너지 텍스처 패닝.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#panner'
            },
            {
                term: 'Rotator (로테이터 회전)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '시간을 입력값으로 삼아 UV 좌표를 특정 중심점 기준 원형으로 뱅글뱅글 회전시킵니다.',
                why: '마법 소용돌이, 혹은 태풍의 중심부 회오리처럼 텍스처가 뱅글뱅글 회전하는 흐름을 연출하기 위해 사용합니다.',
                formula: 'Speed (0.85), Coordinate (TexCoord) ➡️ 나선형으로 빙글빙글 돌며 모여드는 에너지 펄스.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#rotator'
            },
            {
                term: 'Time (시간 입력)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '에디터가 실행되는 동안 누적되는 실시간 시간 데이터(초 단위)를 계속 방출하는 시계 노드입니다.',
                why: '패너의 속도, 로테이터의 회전, 혹은 Sine 파형의 진동 진폭 등 모든 시간적 변화를 추동하는 메인 엔진 노드입니다.',
                formula: 'Time * Emissive Parameter ➡️ 시간에 비례해 파동치는 에너지 발광 제어.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#time'
            },
            {
                term: 'Sine / Cosine (삼각함수 파동)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '입력받은 수치에 맞춰 -1에서 1 사이를 연속 진동하는 사인/코사인 파동 파형을 생성합니다.',
                why: '번개가 지터 진동하며 깜빡거리거나, 보호막 구체가 은은하게 숨 쉬듯 커졌다 작아지는 맥박(Flicker/Pulse) 셰이더에 필수입니다.',
                formula: 'Sine (Time * Speed: 15.0) * 0.5 + 0.5 ➡️ 0과 1 사이를 빠르게 왕복 진동하며 눈부시게 번쩍이는 번개 발광.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#sine'
            },
            {
                term: 'Multiply (곱셈)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력받은 두 수치 A와 B를 곱하여 결과 채널을 방출합니다.',
                why: '단색 텍스처에 컬러 벡터를 곱해 채색하거나, 마스크에 고상수(e.g., 50.0)를 곱해 네온처럼 타오르는 발광(Emissive) 강도를 유도할 때 연결합니다.',
                formula: 'Lava Mask * Emissive Color (Orange) * 35.0 (Power) ➡️ 형광 오렌지로 타오르는 용암 셰이딩.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#multiply'
            },
            {
                term: 'Add (덧셈)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '두 채널 값 Aและ B를 더해 방출합니다.',
                why: '두 개의 서로 다른 노이즈 텍스처를 겹쳐서 밝게 혼합하거나, 셰이더 끝단에 발광 테두리를 인위적으로 더해 덧씌우는 연산에 사용됩니다.',
                formula: 'Base Fire Texture + Highlight Fire Edge ➡️ 두 유체가 합쳐져 깊이가 생기는 중첩 화염.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#add'
            },
            {
                term: 'Subtract (뺄셈)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력값 A에서 입력값 B를 빼서 도출합니다.',
                why: '디졸브 상태의 특정 수치를 빼서 얇은 고리 모양의 타들어 가는 껍질 띠를 추출하고 에지 띠를 채색할 때 고정적으로 쓰입니다.',
                formula: '(Dissolve Mask + 0.05) - Dissolve Mask ➡️ 디졸브가 깎여나가는 경계면에만 색을 칠하는 외곽 에지 마스크.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#subtract'
            },
            {
                term: 'Linear Interpolate (Lerp / 선형 보간)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '보간 인자 Alpha(0~1)를 제어로 삼아, 0일 땐 입력 A, 1일 땐 입력 B, 중간 수치일 땐 그 사잇값 비율을 그라데이션 선형 혼합합니다.',
                why: '식어가는 용암 지면(A: 검은 돌, B: 붉은 용암)을 알파 노이즈 맵 비율에 맞춰 자연스럽게 녹아들 듯 색상을 입힐 때 엮어줍니다.',
                formula: 'Lerp (Stone Diffuse, Lava Emissive, Lava Noise Mask) ➡️ 노이즈에 의해 부분부분 용암이 드러나는 지반.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#linearinterpolate'
            },
            {
                term: 'Component Mask (컴포넌트 마스크)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: 'RGB 등의 다중 채널 벡터 데이터에서 사용자가 체크한 특정 단일 채널(예: R 또는 G)만 골라내 단색 흑백 마스크로 변환합니다.',
                why: '가령 노멀 맵에서 가로/세로 편차 정보(R, G)만 떼어내 굴절(Refraction) 뒤틀림 변수로 넘기거나 연산을 경량화할 때 사용합니다.',
                formula: 'Normal Texture ➡️ Component Mask (R, G) ➡️ 2D 왜곡 벡터로 활용.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#componentmask'
            },
            {
                term: 'Step (이진화 임계값 필터)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력받은 임계값(Threshold)을 기준으로, 그 값을 넘어가면 1.0(완전 흰색), 미달하면 0.0(완전 검은색)으로 픽셀을 강제 이분법 판정합니다.',
                why: '스타일라이즈드(카툰풍) 이펙트에서 외곽선이 흐리멍텅하게 뭉개지지 않고 셀애니메이션처럼 쾅하고 칼같이 쪼개지는 외곽선을 그릴 때 필수입니다.',
                formula: 'Step (0.45, Noise Texture) ➡️ 흐릿한 연기 텍스처를 덩어리감 있는 만화 구름 형태로 전환.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#step'
            },
            {
                term: 'SmoothStep (부드러운 곡선 보간)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '지정된 Min 범위 미만은 0, Max 범위를 초과하면 1로 판정하며, 그 사잇구간은 부드러운 곡선 그라데이션 비율로 완화해 보간합니다.',
                why: '디졸브 타들어 가는 경계 마스크를 다듬을 때, Step처럼 과도하게 날카롭지 않고 은은하게 흐려지는 소프트한 테두리 그라데이션을 얻기 위함입니다.',
                formula: 'SmoothStep (Dissolve_Amount, Dissolve_Amount + 0.15, Noise) ➡️ 서서히 무너지며 소멸하는 디졸브 셰이더.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#smoothstep'
            },
            {
                term: 'Fresnel (프레넬 외곽선 반사)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '카메라 렌즈 각도와 메쉬의 표면 방향 노멀 벡터가 직교를 이룰 때(비스듬한 외곽 사면) 가장 밝아지는 림 라이트 물리 반사공식 노드입니다.',
                why: '보호막 에너지 쉴드 테두리가 야광으로 빛나게 하거나, 보석/크리스탈의 사선 굴절 면이 반짝이는 입체 광택을 묘사할 때 배치합니다.',
                formula: 'Fresnel (Exponent: 5.0) * Particle Color (RGB) * 20.0 ➡️ 외곽 테두리가 신비하게 발광하는 보호막.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#fresnel'
            },
            {
                term: 'Depth Fade (지면 충돌 완충)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '반투명 머터리얼 메쉬가 깊이 버퍼(Depth Buffer) 지면 지형과 충돌해 포개지는 선 상을 감지해 자동으로 투명도를 부드럽게 감쇄합니다.',
                why: '바닥 마법진, 안개 스프라이트, 물방울이 땅과 포개지는 경계선에서 가위로 싹둑 오려낸 듯한 날카로운 칼선 그래픽 에러를 예방하는 절대적인 최적화 노드입니다.',
                formula: 'Depth Fade (Fade Distance: 60.0) ➡️ 지면 경계가 안개처럼 부드럽게 풀려 밀착되는 마법진.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/depth-material-expressions-in-unreal-engine#depthfade'
            },
            {
                term: 'Camera Offset (카메라 시점 오프셋)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '픽셀의 깊이 위치를 강제로 카메라 시점 쪽으로 미세하게 끌어당겨 평면을 오프셋시킵니다.',
                why: '데칼이나 총구 화염 스프라이트가 벽 속에 파묻혀 반쯤 잘려서 나오거나, 여러 장의 이펙트 판이 포개질 때 파고들어가 깜빡거리는 제트 파이팅(Z-Fighting) 현상을 우아하게 해결하기 위함입니다.',
                formula: 'Camera Offset (Offset Value: -15.0) ➡️ 벽면 속에 탄흔 데칼이 묻히지 않고 표면에 드러나도록 제어.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/depth-material-expressions-in-unreal-engine#cameraoffset'
            },
            {
                term: 'Pixel Depth Offset (PDO / 픽셀 깊이 오프셋)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '물리적인 렌더 깊이 버퍼 값만 뒤로 밀어서, 그래픽카드 입장에서 실제보다 물체가 뒤에 있는 것처럼 인지하게 만듭니다.',
                why: '물이나 잔디가 지형과 만날 때 충돌 경계를 부드러운 반투명 블렌딩으로 뭉개주어 자연스럽게 녹아들게 할 때 활용합니다.',
                formula: 'PDO에 노이즈를 엮어 주입 ➡️ 수면 경계가 돌가루나 자갈과 맞물려 자연스럽게 투과해 보이는 반투명 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/depth-material-expressions-in-unreal-engine#pixeldepthoffset'
            },
            {
                term: 'One Minus (1-x / 반전)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력값 X를 1.0에서 뺀 수치(1-X)를 리턴하는 단항 반전 노드입니다.',
                why: '흰색을 검은색으로, 투명을 불투명으로, 혹은 리본 트레일 꼬리의 그라데이션 값을 정반대로 뒤집는 논리 반전에 자주 연결합니다.',
                formula: 'One Minus (TexCoord.U) ➡️ 꼬리로 갈수록 얇아지는 리본 궤적 마스크.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#oneminus'
            },
            {
                term: 'Abs (절대값)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력된 부호에 관계없이 음수 영역을 강제로 모두 양수로 반전하는 수학 절대값 노드입니다.',
                why: '리본 트레일의 가로 축 중심(0.5)을 기준으로 대칭하는 외곽 가장자리 마스크를 추출하고자 할 때 주로 엮어냅니다.',
                formula: 'Abs (TexCoord.V - 0.5) * 2 ➡️ 꼬리가 갈라지는 비산 기류.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#abs'
            },
            {
                term: 'Radial Gradient Exponential (원형 그라데이션)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '중심 좌표를 기준으로 바깥으로 갈수록 구형 감쇄 곡선을 그리며 서서히 흐려지는 아름다운 정원형 마스크를 그립니다.',
                why: '구체형 에너지 폭발 판넬, 마법 구체 문양 코어의 둥근 발광 질감을 매핑 텍스처 없이 즉석에서 수학적으로 조립할 때 유용합니다.',
                formula: 'RGE (Radius: 0.5, Density: 4.0) * Particle Color ➡️ 둥근 고밀도 마법 에너지 구체.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#radialgradientexponential'
            },
            {
                term: 'Bump Offset (범프 오프셋 가상 뎁스)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '높이 맵(Height Map)의 요철 값을 활용해 픽셀의 UV 텍스처 매핑 좌표를 시각 왜곡시켜 입체감을 모사하는 간이 뎁스 노드입니다.',
                why: '평면 바닥 지면 데칼에서, 균열 내부가 아래로 쑥 파여 들어간 듯한 가상 3D 깊이감을 엄청나게 가볍고 빠르게 시각화할 때 연결합니다.',
                formula: 'Height (높이 맵의 R채널), Height Ratio (0.05) ➡️ 땅속에 입체 용암이 고여 있는 균열 데칼.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#bumpoffset'
            },
            {
                term: 'Parallax Occlusion Mapping (POM / 패럴렉스 맵핑)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '높이 맵을 기반으로 광선이 투과해 들어가는 깊이 추적(Ray-marching) 계산을 픽셀 셰이더 내에서 실시간 처리해 극단의 입체 돌출감을 렌더링하는 하이엔드 노드입니다.',
                why: 'Bump Offset보다 훨씬 정밀하고 왜곡 없는 수직 90도 균열 단면의 깊이와 요철을 묘사하기 위해 사용합니다 (모바일 사용 불가).',
                formula: 'Height Map, Height Ratio (0.1) ➡️ 캐릭터가 딛는 지형 바위 사이의 고밀도 크랙 뎁스.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#parallaxocclusionmapping'
            },
            {
                term: 'Refraction (굴절 왜곡 핀)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '픽셀의 Normal 벡터 방향 정보를 기반으로, 물을 투과해 보이는 뒤쪽 화면 픽셀의 시각 좌표를 꺾어서 뒤틀어 출력합니다.',
                why: '충격파 쇼크웨이브에 의한 공기 뒤틀림, 수면 밑의 굴절, 보호막 주변 렌즈 왜곡 효과를 구현하는 핵심 연결 핀입니다.',
                formula: 'Normal Map * Strength (0.05) ➡️ 화면이 물결처럼 꿀렁거리며 굴절되는 쇼크웨이브 왜곡 연출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#refraction'
            },
            {
                term: 'Texture Sample (텍스처 샘플)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '2D 텍스처 이미지 에셋을 불러와 입력된 UV 좌표에 맞춰 픽셀 컬러 정보(RGB, R, G, B, A)를 셰이더 그래프로 환산 추출합니다.',
                why: '그림, 노이즈, 형태 등 모든 비주얼 리소스를 머터리얼 내로 수용하기 위한 핵심 관문입니다.',
                formula: 'Texture Sample (T_Noise_01) ➡️ 용암 균열의 디졸브 형태 마스크 소스.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#texturesample'
            },
            {
                term: 'Constant (상수 1Vector / Constant 1,2,3,4)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '소수점을 포함한 단일 실수값(Scalar), 혹은 다차원 벡터 상수값(Vector 2, 3, 4)을 지정하여 수학 연산의 계수나 컬러 데이터로 주입합니다.',
                why: '셰이더 안에서 변하지 않는 불변의 수치(예: 굴절률 1.33, 러프니스 수치 0.2)를 확정 짓기 위함입니다.',
                formula: 'Constant (0.05) ➡️ 스펙큘러 강도를 미세하게 억제하는 고정 계수.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/constant-material-expressions-in-unreal-engine'
            },
            {
                term: 'Divide (나눗셈)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력값 A를 입력값 B로 나눈 결과를 채널로 반환합니다.',
                why: '수치 범위를 압축하여 그라데이션 경계를 아주 부드럽게 완화시키거나, 특정 거리 단위를 픽셀 좌표값으로 환산할 때 활용합니다.',
                formula: 'Distance / 1000.0 ➡️ 1000유닛 거리 단위를 0~1 사이 정규 분포로 변환.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#divide'
            },
            {
                term: 'Power (거듭제곱)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력값 Base를 Exp(지수)만큼 거듭제곱하여 출력합니다.',
                why: '그라데이션 마스크의 대비(Contrast)를 조절하는 핵심 노드로, 1 이하의 어두운 구역은 더 어둡게 누르고 밝은 핫스팟만 날카롭게 강조할 때 필수적입니다.',
                formula: 'Power (Noise, 5.0) ➡️ 흐릿한 노이즈를 뾰족하게 깎은 섬세한 불꽃 중심부 코어.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#power'
            },
            {
                term: 'Clamp (수치 한계 고정)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '입력값이 지정한 최솟값(Min: 기본 0)과 최댓값(Max: 기본 1) 범위를 벗어나지 않도록 강제로 한계를 고정 가둡니다.',
                why: '덧셈이나 곱셈이 누적되어 RGB 색상값이 1.0을 초과하거나 0.0 미만으로 떨어져 렌더링에 노이즈 에러(타들어가는 흰색 깨짐)가 생기는 것을 사전에 방지합니다.',
                formula: 'Clamp (Emissive_Value, 0.0, 1.0) ➡️ 안전한 블렌딩 투명도 수치 제한.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#clamp'
            },
            {
                term: 'Absolute World Position (월드 좌표)',
                cat: 'material',
                catName: '머터리얼 UV',
                def: '물체 위치한 게임 월드 전체의 절대 3차원 위치 좌표(X, Y, Z)를 픽셀 단위로 실시간 추출합니다.',
                why: '캐릭터가 이동하거나 스케일이 바뀌어도, 월드 공간에 고정된 절차적 노이즈나 가로/세로 높이 기준 안개 마스크를 흔들림 없이 설계하기 위해 사용합니다.',
                formula: 'WorldPosition.Z ➡️ 지상 0 지점부터 위로 갈수록 짙어지는 선형 안개(Height Fog).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine#worldposition'
            },
            {
                term: 'Vertex Color (버텍스 컬러)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '3D 메쉬의 개별 정점(Vertex)에 도색되어 있는 RGB 및 알파 데이터를 추출합니다.',
                why: '모델링 툴에서 칠해온 마스킹 채널을 활용해 특정 부위(예: 칼날 끝단)만 이펙트가 흐르게 하거나, 나이아가라의 기본 파티클 컬러를 셰이더로 전달받기 위해 주입합니다.',
                formula: 'Vertex Color.A * Texture Alpha ➡️ 파티클 투명도와 머터리얼 불투명도 완전 결합.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#vertexcolor'
            },
            {
                term: 'Custom (HLSL 커스텀 셰이더)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '언리얼의 노드 방식이 아닌, 직접 HLSL 코드를 타이핑하여 복잡한 알고리즘이나 수학 수식을 픽셀/버텍스 단에서 초고속 처리하는 셰이더 블록입니다.',
                why: '루프(for문) 연산, 복잡한 커스텀 레이마칭 렌더링 등 기성 노드로 구현하기 극도로 곤란한 하이엔드 알고리즘을 셰이더에 직계 주입하기 위함입니다.',
                formula: 'Custom HLSL: return A + B; ➡️ 노드 연결을 최소화한 수학 코드 박스.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/custom-material-expressions-in-unreal-engine#custom'
            },
            {
                term: 'Scene Texture (씬 텍스처)',
                cat: 'material',
                catName: '머터리얼 뎁스',
                def: '현재 카메라 화면에 맺히고 있는 렌더링 프레임 버퍼(Scene Color, Scene Depth, Custom Stencil 등)를 실시간 샘플링하여 셰이더 내부로 호출합니다.',
                why: '반투명 보호막 너머의 아군 실루엣을 하이라이트로 그리거나, 화면 전체의 포스트 프로세스 이펙트를 제어하는 핵심 브릿지 노드입니다.',
                formula: 'SceneTexture (Scene Depth) ➡️ 카메라와의 실제 장애물 깊이 탐지.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine#scenetexture'
            },
            {
                term: 'Dot Product (내적)',
                cat: 'material',
                catName: '머터리얼 수학',
                def: '두 3차원 벡터 방향의 유사도(각도 코사인값)를 내적 계산하여 단일 실수값을 리턴합니다.',
                why: '카메라가 바라보는 방향(Camera Vector)과 표면의 수직 방향(Normal Vector)이 일치하는 평평한 면과 외곽 사면을 수학적으로 걸러내 프레넬을 직접 구현하거나 라이팅 각도를 가늠할 때 필수적입니다.',
                formula: 'Dot (NormalWS, CameraVectorWS) ➡️ 카메라 시선과 표면 각도의 평행 계수 산출.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine#dotproduct'
            },
            // ==========================================
            // OPTIMIZATION WHITEPAPER (Chapter 6)
            // ==========================================
            {
                term: 'Shader Complexity & Overdraw (오버드로 및 셰이더 복잡도)',
                cat: 'opt',
                catName: '최적화',
                def: '반투명(Translucent) 파티클이 카메라 뷰 상에서 여러 겹으로 두껍게 겹쳐서 그릴 때 발생하는 심각한 연산 지연 현상입니다.',
                why: '뷰포트에서 [Shader Complexity]를 켜서 붉은색이나 흰색으로 불타오르는 구역이 있다면, 겹치는 파티클의 면적을 줄이거나 개수를 감소시켜 모바일 및 AAA 콘솔 최적화를 확보해야 합니다.',
                formula: '스프라이트 개수 50% 감축 및 SubUV Cutout 기능을 켜서 투명한 빈 공간의 면적 버텍스 제거.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'SubUV Cutout (서브UV 알파 컷아웃)',
                cat: 'opt',
                catName: '최적화',
                def: '텍스처의 알파 채널 투명한 테두리 공백 영역을 메시 지오메트리 버텍스로 바짝 깎아서 그리는 나이아가라 렌더러 최적화 옵션입니다.',
                why: '불이나 연기의 빈 투명 픽셀이 겹침 렌더링되면서 낭비되는 GPU 픽셀 셰이더 클록 낭비를 원천 봉쇄할 수 있습니다.',
                formula: '스프라이트 렌더러 내 "SubUV Cutout" 설정 활성화.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'LOD - Level of Detail (거리별 이미터 컬링)',
                cat: 'opt',
                catName: '최적화',
                def: '카메라와의 3D 거리에 따라 나이아가라 파티클의 스폰율이나 활성화 이미터를 유동적으로 스케일링/비활성화하는 필수 프로토콜입니다.',
                why: '수백 미터 밖에서 발생하는 사소한 파티클은 렌더 자원만 낭비하므로, 거리가 멀어지면 스폰율을 줄이거나 렌더러를 꺼버려 드로우콜을 절감합니다.',
                formula: 'Distance > 4500 유닛 ➡️ Niagara 이미터 자동 비활성화(LOD Curve 설정).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'System Pooling (나이아가라 풀링)',
                cat: 'opt',
                catName: '최적화',
                def: '피격 이펙트, 스파크 등 매 초 수없이 생성되고 파괴되는 이펙트를 메모리에 인스턴스 해제 없이 풀(Pool)에 적재하여 고속 재활용하는 메모리 보존 방식입니다.',
                why: '블루프린트에서 잦은 Spawn/Destroy 시 발생하는 가비지 컬렉션(GC) 프리징 및 끊김 현상을 방지해 줍니다.',
                formula: 'Niagara System Properties ➡️ System Pooling "Enabled", Blueprint ➡️ Spawn System "Auto Release" 바인딩.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'Fixed Bounds (고정 바운드 정의)',
                cat: 'opt',
                catName: '최적화',
                def: '나이아가라에서 GPU Compute Sim을 가동할 때 파티클이 화면에서 그려질 3차원 영역 바운드(Bounds) 크기를 고정하는 모듈입니다.',
                why: '바운드가 실시간 계산(Dynamic Bounds)되면 카메라 가장자리에서 바운드 계산 누락으로 이펙트가 순간 깜빡 꺼지는 렌더 에러가 유발됩니다. 고정 영역을 넉넉히 설정하여 이를 방지합니다.',
                formula: 'Min/Max Bounds (-500, -500, -500) ~ (500, 500, 500) 수동 설정.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'Draw Call & Material Instance (드로우콜 절감)',
                cat: 'opt',
                catName: '최적화',
                def: '메쉬 렌더러 가동 시 각기 다른 머터리얼과 메쉬를 사용해 방출할 경우 CPU가 GPU로 그리기 명령을 반복 전송해 렌더 병목을 일으키는 현상입니다.',
                why: '드로우콜이 쌓이면 프레임이 대폭 깎입니다. 하나의 다채널 아틀라스 텍스처를 공유하고 머터리얼 인스턴스를 공유 매핑해야 드로우콜이 1개로 합쳐집니다.',
                formula: '머터리얼 파라미터 컬렉션(MPC) 및 인스턴싱 설계 최적화 적용.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-instancing-in-unreal-engine'
            },
            {
                term: 'GPU Compute Sim (GPU 병렬 가속)',
                cat: 'opt',
                catName: '최적화',
                def: '이미터의 연산 방식을 CPU가 아닌 그래픽카드의 GPU Compute Shader 병렬 코어를 활용해 가속 연산하는 방식입니다.',
                why: '돌가루 파편이나 눈/비 등 파티클 수가 수천~수십만 단위로 넘어갈 때 CPU 연산 과부하를 0으로 낮추고 그래픽카드 병렬 연산력으로 가속하기 위함입니다.',
                formula: 'Niagara Emitter Properties ➡️ Sim Target "GPU Compute Sim" 적용.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'Shader Instruction Count (셰이더 명령수 관리)',
                cat: 'opt',
                catName: '최적화',
                def: '픽셀/버텍스 셰이더가 한 픽셀을 그리기 위해 그래픽카드에서 연산해야 하는 어셈블리어 수식 명령의 최종 물리 개수입니다.',
                why: '머터리얼 에디터 하단의 Stats 창에서 [Instruction Count]를 모니터링해야 합니다. 픽셀 연산 수가 200~300을 초과하면 저사양 모바일 및 대규모 난전 상황에서 GPU 병목의 주요 원인이 됩니다.',
                formula: '수학 노드를 단순화하고 가급적 텍스처 채널에 여러 흑백 마스크를 우겨넣는 채널 팩킹(Channel Packing) 설계 기조 준수.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-instancing-in-unreal-engine'
            },
            {
                term: 'Quad Overdraw & Microtriangles (마이크로폴리곤 픽셀 낭비)',
                cat: 'opt',
                catName: '최적화',
                def: '3D 메쉬의 폴리곤 크기가 2x2 픽셀(쿼드)보다 극히 미세하게 작아질 때, 그래픽카드가 쿼드 단위 연산 한계로 인해 외곽선 밖의 픽셀까지 낭비해서 렌더링하는 현상입니다.',
                why: '원거리의 파티클 메쉬에 폴리곤이 너무 많으면 CPU/GPU가 렌더 버퍼를 헛돌게 되므로, LOD를 이용해 멀어지면 극도로 단순한 로우폴리곤 메쉬로 교체하거나 아예 꺼주어야 합니다.',
                formula: 'LOD 1~2 단계 적용으로 원거리 이미터 메시 폴리곤 80% 감축.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'Stat GPU & Stat Niagara (엔설런트 프로파일링 명령어)',
                cat: 'opt',
                catName: '최적화',
                def: '언리얼 엔진 콘솔 창(`키)에서 가동할 수 있는 실시간 렌더 버퍼 및 나이아가라 스폰 성능 수치 모니터링 명령 라인입니다.',
                why: '프레임 드랍이 일어날 때, 이것이 머터리얼 드로우콜 렉인지(Stat GPU), 아니면 파티클 업데이트 연산의 CPU 부하인지(Stat Niagara) 정확히 계측하여 치료하기 위함입니다.',
                formula: '콘솔 명령: `stat GPU` (포스트 프로세스, 섀도, 베이스패스 계측) 및 `stat Niagara` (이미터 연산 시간).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-simulation-stages-in-unreal-engine'
            },
            {
                term: 'Emission (입자 방출) ➡️ Spawn Rate / Spawn Burst',
                cat: 'unity',
                catName: '기본/스폰',
                def: '유니티 Shuriken의 지속적인 방출(Rate over Time)과 순간 분출(Bursts)은 언리얼 나이아가라 이미터 업데이트의 Spawn Rate 및 Spawn Burst Instantaneous 모듈로 1:1 완벽 대응합니다.',
                why: '스폰 방식은 개념이 동일하지만, 나이아가라는 스폰 시점과 업데이트 루프 상태를 Emitter State 모듈에서 명시적으로 규정해 주어야 합니다.',
                formula: 'Unity Rate over Time (100) ➡️ Niagara Spawn Rate (100) / Unity Bursts Count (50) ➡️ Niagara Spawn Burst Instantaneous (Spawn Count: 50).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spawnrate',
                migrationDetail: `■ Niagara Spawn Rate & Burst 상세
1. Spawn Rate 모듈:
   - 초당 생성할 파티클의 개수를 실수(Float) 혹은 커브 데이터로 지속 스폰합니다.
   - 'Spawn Factor' 매개변수를 활용해 게임 성능 상황에 맞춰 방출량을 전역 비례 제어할 수 있습니다.
2. Spawn Burst Instantaneous 모듈:
   - 지정된 수명 주기의 특정 타임라인 오프셋 프레임(주로 시작점 0초)에 수십~수백 개의 입자를 폭발적으로 동시 스폰합니다.
   - 'Spawn Count'로 방출량을 지정하며, 'Probability'를 통해 스폰 확률을 연동 가능합니다.
3. Emitter State와의 라이프사이클 링킹:
   - 유니티의 루핑 옵션과 달리, 이미터 업데이트 최상단 'Emitter State'의 Loop Behavior(Infinite, Once), Loop Duration, Delay 등의 설정값 범위 내에 스폰 주기가 완벽히 정렬되도록 연립 조율해 주어야 이펙트 끊김 현상을 예방할 수 있습니다.`
            },
            {
                term: 'Shape (방출 형태/위치) ➡️ Spawn Location',
                cat: 'unity',
                catName: '기본/스폰',
                def: '유니티의 Sphere, Cone, Box 등의 형태 영역 스폰은 나이아가라 생성(Particle Spawn) 단계의 Sphere Location, Box Location, Cone/Cylinder Location 등으로 이식됩니다.',
                why: '유니티에서는 기본 기하학 구조를 리스트에서 선택하지만, 나이아가라는 원하는 모양의 Location 모듈을 개별 노드로 스택 배치하여 오프셋을 조율하는 구조입니다.',
                formula: 'Unity Shape: Cone (Angle: 25, Radius: 0.5) ➡️ Niagara Add Velocity in Cone (Cone Angle: 25.0) + Cone/Cylinder Location (Radius: 50.0).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#boxlocation',
                migrationDetail: `■ Niagara Spawn Location 스택 상세
1. Box Location 모듈:
   - 직육면체 볼륨 내에 입자를 스폰합니다.
   - 'Box Size' (X, Y, Z 크기 범위) 조절과 'Spawn Probability' 가중치를 지원합니다.
2. Sphere Location 모듈:
   - 구체 볼륨 혹은 표면에서 스폰합니다.
   - 'Sphere Radius' 제어 및 특정 절반 구형에서만 나오게 하는 'Hemisphere Z' 설정, 'Surface Only' 마스킹을 활용 가능합니다.
3. Cylinder / Torus Location 모듈:
   - 실린더 반경/높이 제어 및 도넛 링 형태 스폰 영역을 설정합니다.
4. Mesh Location / Skeletal Mesh Sampling:
   - 지정된 Static/Skeletal Mesh의 폴리곤 삼각 표면(Triangle), 버텍스(Vertex), 혹은 뼈대(Bone) 좌표를 실시간 읽어 표면 위에서 정확히 파티클을 분출시킵니다.`
            },
            {
                term: 'Velocity over Lifetime (시간별 속도) ➡️ Add Velocity / Solve Forces',
                cat: 'unity',
                catName: '물리/거동',
                def: '유니티의 시간 경과에 따른 이동 속도 및 방향 지정은 나이아가라의 Add Velocity(선형/원뿔 속도 추가) 모듈 및 Particle Update의 Solve Forces and Velocity 물리 연산 판으로 환산 이식됩니다.',
                why: '유니티는 속도를 하나의 통합옵션에서 곡선으로 만지지만, 나이아가라는 매 프레임 속도를 누적하는 물리 방정식(Solve Forces)이 백그라운드에서 돌고 있어야 3D 월드 이동 궤적이 반영됩니다.',
                formula: 'Unity Velocity X/Y/Z Curves ➡️ Niagara Add Velocity (Linear/Cone) ➡️ Solve Forces and Velocity.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#addvelocity',
                migrationDetail: `■ Niagara 속도 추가 및 물리 솔버 계산식
1. Add Velocity / Add Velocity in Cone 모듈:
   - 파티클 스폰(Particle Spawn) 단계에서 가동하여 초기 발사 방향과 세기(속도 벡터 X, Y, Z)를 가산합니다.
2. Particle Update 스택 연동:
   - 유니티와 달리, 속도 벡터나 중력/바람 등의 힘(Forces)을 스택상에 다량 레이어링하여 누적한 뒤, 매 프레임 파이프라인 맨 끝단의 'Solve Forces and Velocity' 모듈을 거쳐 물리 이동 궤적을 픽셀 위치로 환산합니다.
3. Solve Forces and Velocity 모듈:
   - 가속도와 속도의 누적 변화량을 계산하는 필수 물리 솔버입니다.
   - NewPosition = Position + (Velocity * DeltaTime)
   - NewVelocity = Velocity + (Force * Mass * DeltaTime)
   - 이 모듈이 누락되면 입자에 속도나 힘을 아무리 가해도 화면에서 정지 상태로 유지됩니다.`
            },
            {
                term: 'Limit Velocity over Lifetime (속도 제한) ➡️ Drag (대기 저항)',
                cat: 'unity',
                catName: '물리/거동',
                def: '유니티에서 폭발 후 입자들이 공기 저항에 부딪혀 급격히 속도가 깎이는 제한 감속은 나이아가라의 Drag(대기 저항) 모듈이 완벽히 분담합니다.',
                why: '유니티의 Limit Velocity는 속도 임계값(Dampen)을 수동 제한하지만, 나이아가라는 대기 항력 물리 공식(F = -k * v)에 입각해 Drag Coefficient 값을 키워 훨씬 자연스러운 감속 유동성을 도출해 냅니다.',
                formula: 'Unity Dampen (0.15) ➡️ Niagara Drag (Drag Coefficient: 1.5 ~ 2.5).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#drag',
                migrationDetail: `■ Niagara Drag (대기 항력 저항) 물리 작용
1. Drag 모듈 작동 원리:
   - 유니티 Shuriken의 속도 제한(Limit Velocity)은 특정 속도 임계값 이상을 강제 클램프(Clamp)로 억제하지만, 언리얼은 물리 법칙에 입각한 대기 공기 저항력을 실시간 인가합니다.
   - 감속 마찰 저항력: F = -k * v (k: Drag Coefficient 저항 계수, v: 파티클 현재 속도)
   - 파티클의 움직임이 빠를수록 강한 감속 효과를 주며, 속도가 느려지면 저항도 부드럽게 소멸하여 자연스러운 기체 유체 감속 궤적을 띱니다.
2. 파라미터 구성:
   - 'Drag' 값에 1.0 ~ 3.5 정도의 계수를 주거나, 수명 진척도('NormalizedAge') 커브를 엮어 초기에만 빠르고 나중에는 공중에 고이 머물며 서서히 멈추는 안개 감쇄 묘사를 구현합니다.`
            },
            {
                term: 'Force over Lifetime (시간별 외력) ➡️ Point Force / Gravity Force',
                cat: 'unity',
                catName: '물리/거동',
                def: '지속적인 바람, 중력, 혹은 구심점 힘을 입자에 가해 궤적을 굽히는 기능은 나이아가라의 Apply Gravity, Point Force, Wind Force 등으로 이식됩니다.',
                why: '나이아가라는 각각의 물리적인 힘(Force)들이 가산 누적되는 모듈 방식을 띄고 있어, 중력과 바람을 여러 개 중첩 레이어링하여 복합적인 물리 기류를 설계하기에 대단히 직관적입니다.',
                formula: 'Unity Force Z (-9.81) ➡️ Niagara Apply Gravity (Gravity Magnitude: 980.0) ➡️ Solve Forces.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#gravityforce',
                migrationDetail: `■ Niagara Force(외력) 스택 레이어링 상세
1. Apply Gravity 모듈:
   - 입자의 질량(Mass)과 가속도를 곱하여 지구 중력 낙하를 유도합니다.
   - 기본 Magnitude는 -980.0(Z축)이며 커브로 중력 반전 효과도 설정할 수 있습니다.
2. Point Force 모듈:
   - 지정된 3D 월드 좌표 점(Origin)을 기준으로 파티클들을 끌어당기거나(Repel 강도 음수) 바깥으로 밀어냅니다(Repel 강도 양수).
   - 'Falloff' 파라미터로 구심점 거리에 비례한 완충 물리 감쇠를 제어합니다.
3. Wind Force 모듈:
   - 월드 방향 벡터에 기류 풍속 압력을 인가하여 입자들을 지속 이동시킵니다.`
            },
            {
                term: 'Color over Lifetime (시간별 색상) ➡️ Scale Color',
                cat: 'unity',
                catName: '렌더러/텍스처',
                def: '입자의 수명 진척도에 따라 투명해지거나 색을 바꾸는 유니티 그라데이션 에디터는 나이아가라 업데이트 단계의 Scale Color 모듈로 1:1 변환됩니다.',
                why: '유니티는 그라데이션 키프레임 하나에서 색상과 알파를 묶어 조절하지만, 나이아가라는 RGB 컬러 커브와 알파 커브를 독립적으로 매칭하거나 머터리얼의 Dynamic Parameter로 넘겨서 처리합니다.',
                formula: 'Unity Gradient (Alpha Fade-out at End) ➡️ Niagara Scale Color (Alpha: 0.0s ➡️ 1.0, 1.0s ➡️ 0.0 Curve).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scalecolor',
                migrationDetail: `■ Niagara Scale Color & 셰이더 연계
1. Scale Color 모듈:
   - Particle Update 단계에서 실시간 작동하여 파티클의 베이스 컬러(RGB) 및 투명도(Alpha)를 수명 주기에 맞춰 배칭 보간합니다.
2. Alpha Fade Out 곡선 맵핑:
   - 'Scale Alpha' 입력 핀에 커브(Curve)를 매칭하여 NormalizedAge가 0.0일 땐 1.0(완전 불투명), 1.0일 땐 0.0(완전 투명)으로 제어해 소멸부의 깜빡거리는 딱딱함을 부드럽게 완화합니다.
3. Material Parameter 링킹:
   - 머터리얼 내의 'Particle Color' 노드와 다이렉트 1:1 바인딩되어 동작하며, RGB 스케일에 30.0 이상의 발광 부스트(Emissive Scale)를 엮으면 수명 곡선에 따라 번쩍이는 네온 폭발 아크를 빚어낼 수 있습니다.`
            },
            {
                term: 'Size over Lifetime (시간별 크기) ➡️ Scale Sprite Size / Scale Mesh Size',
                cat: 'unity',
                catName: '렌더러/텍스처',
                def: '수명에 연계되어 입자가 부풀어 오르거나 서서히 사그라드는 연출은 나이아가라의 Scale Sprite Size(스프라이트용) 혹은 Scale Mesh Size(메쉬 파편용) 모듈이 고스란히 수행합니다.',
                why: '유니티는 단일 크기 배율만 지원하지만, 나이아가라는 Sprite Size와 Mesh Scale Factor의 가로(X), 세로(Y), 높이(Z) 개별 축을 임의의 상이한 곡선 비율로 비정형 찌그러뜨리며 팽창시키는 변형이 가능합니다.',
                formula: 'Unity Size Curve (Linear Decay) ➡️ Niagara Scale Sprite Size (Vector2 Curve: 0.0s ➡️ 1.0, 1.0s ➡️ 0.0).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#scalespritesize',
                migrationDetail: `■ Niagara Scale Size 크기 제어
1. Scale Sprite Size 모듈:
   - 2D Sprite 파티클의 수명에 동기화해 가로(X)와 세로(Y) 크기 스케일을 유동 연산합니다.
   - Vector2 Curve 구조를 취하여 X와 Y 축에 상이한 스케일 곡선을 가할 수 있습니다. 예를 들어, 발사 진행 방향 축(X)을 순간적으로 2배 이상 늘려 뾰족하고 속도감 있는 타격 궤적 라인을 연출합니다.
2. Scale Mesh Size 모듈:
   - 3D Mesh 파티클의 X, Y, Z축 크기 비율을 비정형 변형 제어합니다.
   - 얼음 기둥이 대지에서 위로 길쭉하게 늘어나며 솟구쳐 오르는 입체 변이 연출에 필수적으로 활용됩니다.`
            },
            {
                term: 'Rotation over Lifetime (시간별 회전) ➡️ Sprite Rotation Rate / Mesh Rotation Rate',
                cat: 'unity',
                catName: '렌더러/텍스처',
                def: '날아다니는 파티클이나 돌가루가 공중에서 뱅글뱅글 자전 회전하게 하는 기능은 나이아가라의 Initial Sprite Rotation + Sprite Rotation Rate 모듈로 변환됩니다.',
                why: '유니티는 각도(Angle) 자체를 회전시키지만, 나이아가라는 최초 스폰 각도(Initial Sprite Rotation)와 초당 회전 각속도(Rotation Rate)를 명확히 구분하여 거동의 안정성을 기합니다.',
                formula: 'Unity Rotation speed (45 deg) ➡️ Niagara Initial Sprite Rotation (0~1 무작위) + Sprite Rotation Rate (0.125 ~ 0.250 회전 속도).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference',
                migrationDetail: `■ Niagara Rotation 회전 각속도 매핑
1. Initial Sprite Rotation 모듈:
   - 파티클 스폰 시점(단 1프레임)에 스프라이트의 초기 자전 각도(0.0 ~ 1.0 범위, 360도로 변환 계산)를 결정합니다. 난수(Random Range) 범위를 주어 생성 입자마다 비정형 각도를 띠게 만듭니다.
2. Sprite Rotation Rate 모듈:
   - Particle Update 스택에서 매 초당 회전할 각속도(Rotation Rate)를 결정합니다.
   - 값이 양수면 시계 방향, 음수면 반시계 방향으로 뱅글뱅글 돕니다.
3. Update Mesh Orientation / Mesh Rotation Rate:
   - 3D 메쉬 파편의 Pitch, Roll, Yaw 회전 축을 독립적인 각속도 곡선으로 연립 제어하여 사실적인 돌덩어리 비산을 연산합니다.`
            },
            {
                term: 'Noise (절차적 노이즈 흔들림) ➡️ Curl Noise Force',
                cat: 'unity',
                catName: '물리/거동',
                def: '지그재그로 흐르거나 가벼운 유체 기류처럼 파동 치며 승화하는 불티/연기는 나이아가라 업데이트의 Curl Noise Force 모듈로 완벽 매핑됩니다.',
                why: '유니티의 Noise는 수학적 옥타브 대비 거친 면이 있는 반면, 나이아가라의 Curl Noise는 부드러운 유체 시뮬레이션 벡터 필드와 유사한 고해상도 난기류 기류를 수학적으로 고속 가속 연산하여 비주얼이 대단히 아름답습니다.',
                formula: 'Unity Noise (Strength: 2.0, Frequency: 1.0) ➡️ Niagara Curl Noise Force (Noise Strength: 200, Noise Frequency: 10.0).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#curlnoiseforce',
                migrationDetail: `■ Niagara Curl Noise Force 기류 시뮬레이션
1. Curl Noise Force 작동 상세:
   - 수학적 회전(Curl) 연산 벡터 필드를 활용해, 실제 유체 시뮬레이션을 가동하지 않고도 입자들이 난기류에 휩싸여 꼬이고 춤추는 듯한 유기적 흐름을 실시간 모사합니다.
   - 질량 보존 법칙(Divergence-free)에 기반한 흐름이므로 입자들이 뭉치지 않고 고르게 흩어집니다.
2. 핵심 매개변수:
   - 'Noise Strength': 흔들림 외력의 크기입니다.
   - 'Noise Frequency': 기류 소용돌이 크기 주파수입니다. (수치가 낮으면 크게 굽이치고, 높으면 촘촘하게 떨리며 상승합니다.)
   - 'Pan Noise Field': 시간에 따라 노이즈 공간 자체를 Panning하여 자연 바람 기류 효과를 덧씌웁니다.`
            },
            {
                term: 'Collision (충돌 상호작용) ➡️ Collision (나이아가라)',
                cat: 'unity',
                catName: '물리/거동',
                def: '지면이나 벽에 부딪혀 튕겨 나가게 만드는 연산은 나이아가라 업데이트 단계의 Collision 모듈이 1:1 담당합니다.',
                why: '유니티는 피직스 레이캐스트를 직접 쏴 성능 과부하를 초래하기 쉬운 반면, 나이아가라는 CPU 렉이 0에 수렴하는 GPU Distance Field(디스턴스 필드) 및 Depth Buffer(뎁스 버퍼) 충돌 연산 옵션을 제공하여 대규모 물량 최적화에 탁월합니다.',
                formula: 'Unity Collision World (Dampen: 0.5) ➡️ Niagara Collision (Restitution Coefficient: 0.5, Friction: 0.3).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#collision',
                migrationDetail: `■ Niagara Collision (물리 충돌) 제어판
1. CPU Depth Buffer Collision:
   - 현재 카메라 뷰포트의 화면 뎁스 정보(Screen Space Depth)를 활용하여 충돌을 판정합니다.
   - 연산이 매우 가볍지만, 화면에 보이지 않는 오프스크린(Off-screen) 영역의 물리 충돌은 누락됩니다.
2. Distance Field Collision (디스턴스 필드 충돌):
   - 언리얼의 글로벌 디스턴스 필드 복합 공간 복원 좌표를 탐색해 충돌을 판정합니다.
   - 카메라 뷰 밖에 있는 지형이나 절벽 요철의 3차원 표면 각도까지 정밀 감지하여 튕겨나가는 초고화질 물리 연산이 가능합니다 (Lumen 필수).
3. 핵심 매개변수:
   - 'Restitution (반발 계수)': 충돌 시 튕겨 오르는 탄성 수준 (0: 머무름, 1: 완전 반사).
   - 'Static Friction (마찰 계수)': 지면에 부딪혀 미끄러질 때 멈추게 만드는 마찰 점성력.`
            },
            {
                term: 'Sub Emitters (2차 서브 이미터 연동) ➡️ Collision Event / Spawn Emitter',
                cat: 'unity',
                catName: '기본/스폰',
                def: '파티클이 충돌하거나 죽는 시점에 2차 불티나 먼지를 스폰하는 서브 이미터 설계는 나이아가라의 Generate Collision/Death Event ➡️ Event Handler Properties 연동으로 완벽히 이식됩니다.',
                why: '나이아가라는 이벤트 송수신(Event Generator & Event Handler) 구조로 설계되어 있어, 메인 파티클이 보낸 좌표 데이터를 2차 이미터가 GPU 가속으로 실시간 전달받아 2차 스폰 렌더링에 주입합니다.',
                formula: 'Unity Sub Emitter: On Collision ➡️ Niagara Generate Collision Event -> Event Handler [WallHit] -> Spawn Particle.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#generatecollisionevent',
                migrationDetail: `■ Niagara Event 생성 및 수신 메커니즘
1. Generate Collision / Death Event 모듈:
   - 1차 메인 파티클이 벽에 충돌(Collision)하거나 수명이 다해 소멸(Death)하는 정확한 프레임에, 해당 공간의 3D 위치(Position) 및 속도 벡터 데이터를 이벤트 버퍼로 송출합니다.
2. Event Handler Properties 그룹 설정:
   - 2차 서브 이미터 스택 하단에 탑재합니다.
   - 'Source'를 메인 이미터의 충돌/사망 이벤트 이름으로 링킹 바인딩합니다.
   - 'Execution Mode'를 'Every Event'로 잡으면, 충돌 지점마다 2차 이미터가 정의하는 파편 폭발 스프라이트가 즉각 스폰 및 구동을 이어 나갑니다.`
            },
            {
                term: 'Texture Sheet Animation (시트 애니메이션) ➡️ SubUV Animation',
                cat: 'unity',
                catName: '렌더러/텍스처',
                def: '8x8, 4x4 등 그리드로 쪼개진 시퀀스 텍스처를 2D 플립북 애니메이션으로 재생하는 기능은 나이아가라의 SubUV Animation / SubUV 텍스처 세팅으로 대응됩니다.',
                why: '나이아가라는 이미터 렌더러(Sprite Renderer) 내에 SubUV 에셋 옵션을 정의하고, 수명이나 곡선에 연동된 SubUV Index 프레임 번호를 실시간 갱신하는 형태로 재생 주기를 미세 분배합니다.',
                formula: 'Unity Tiles (8 x 8) ➡️ Sprite Renderer [SubUV: 8x8] + SubUV Animation (Curve: 0.0 ➡️ 63.0).',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#subuvanimation',
                migrationDetail: `■ Niagara SubUV 애니메이션 프레임 제어
1. Sprite Renderer SubUV 옵션:
   - 텍스처 시트의 가로/세로 분할 크기(e.g. Sub Image Size: 8 x 8)를 선언하여 64프레임의 독립 플립북 공간을 분산 확보합니다.
2. SubUV Animation 모듈:
   - Particle Update 단계에 배치하여 프레임 인덱스를 수명 주기에 맞춰 이동시킵니다.
   - 'SubUV Index'에 NormalizedAge 곡선을 엮어 0번 프레임부터 63번 프레임까지 순차 재생합니다.
3. 머터리얼 연계:
   - 머터리얼 내부에 'SubUV Texture Sample' 노드를 장착하면, 파티클 이미터와 프레임 인덱스가 정확히 동화되어 이글거리는 연기 구름을 연속 렌더링합니다.`
            },
            {
                term: 'Renderer (입자 시각 드로잉) ➡️ Sprite / Ribbon / Mesh Renderer',
                cat: 'unity',
                catName: '렌더러/텍스처',
                def: '빌보드 2D 스프라이트, 리본 궤적, 3D 메쉬를 결정해 그리는 유니티 렌더러 탭은 나이아가라 최하단의 Renderer 단계(Sprite, Ribbon, Mesh Renderer)에 대응됩니다.',
                why: '유니티는 한 이미터가 1개의 렌더 모드만 취할 수 있지만, 나이아가라는 하나의 이미터 아래에 Sprite Renderer와 Mesh Renderer, Light Renderer를 동시에 중첩 배치하여 입체적인 렌더 시너지 배합을 이끌어 낼 수 있습니다.',
                formula: 'Unity Render Mode: Billboard ➡️ Niagara Sprite Renderer / Render Mode: Mesh ➡️ Niagara Mesh Renderer.',
                epicLink: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-system-and-emitter-module-reference#spriterenderer',
                migrationDetail: `■ Niagara Renderer 스택 드로잉 특성
1. Multi-Renderer 병렬 가동:
   - 유니티와 달리, 나이아가라는 하나의 이미터 스택 아래에 다수의 렌더러 모듈을 중첩 배치하여 동시에 그릴 수 있습니다. (예: Sprite Renderer로 화염을 그리고, Mesh Renderer로 파편을 날리며, Light Renderer로 주변 레벨 조명을 동시에 투사 가능).
2. Sprite Renderer:
   - 2D 빌보드 Quad 면을 카메라 방향(Facing Mode: Face Camera)에 맞춰 고속 드로잉합니다.
3. Ribbon Renderer:
   - 생성 파티클들의 궤적을 긴 끈(Trail)의 버텍스 면으로 실시간 이어내어 날카로운 칼바람 검상 기류나 번개 궤적 줄기를 렌더링합니다.
4. Mesh Renderer:
   - 실제 3D 스태틱 메쉬(Static Mesh 에셋) 데이터를 각 입자 위치에 얹어 입체 파편을 비산합니다.`
            }
        ];
    }
}
