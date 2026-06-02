/* js/ai-engine.js - Unreal Master VFX Encyclopedia Database */

class VfxAiEngine {
    constructor() {
        this.selectedStyle = 'stylized';
        this.selectedTier = 'aaa';
        
        // Massive Guidebook Chapters Database
        this.chapters = {
            '0': {
                num: '00',
                title: '입문 로드맵 & 첫 이펙트 (Beginner Onboarding)',
                subtitle: '유니티에서 넘어온 사용자와 언리얼 첫 사용자를 위한 작업 화면, 용어 번역, 첫 Niagara 실습 가이드',
                content: `### 📖 Ch 0. 언리얼 VFX 첫 진입 로드맵
이 장은 데칼, 디졸브, 최적화 같은 고급 주제로 들어가기 전에 **언리얼 에디터에서 어디를 보고, 무엇을 눌러야 하는지**를 먼저 잡아주는 입문용 관문입니다. Unity Shuriken에 익숙한 사용자도 여기서 용어를 한 번 번역한 뒤 7장으로 넘어가면 훨씬 덜 헤맵니다.

---

### ✅ 첫 30분 체크리스트
1. **Content Browser 열기**: 에셋을 만들고 찾는 공간입니다. Unity의 Project 창에 가깝습니다.
2. **Niagara System 생성**: Content Browser에서 우클릭 후 FX 또는 Niagara 메뉴에서 새 시스템을 만듭니다.
3. **Emitter 선택**: Empty 또는 Simple Sprite Burst로 시작합니다. 처음에는 복잡한 Fluids보다 Sprite가 안전합니다.
4. **Stack 읽기**: 나이아가라 에디터의 System, Emitter, Particle Spawn, Particle Update, Render 순서만 먼저 외웁니다.
5. **Initialize Particle 수정**: Lifetime, Color, Sprite Size를 바꿔서 눈에 보이는 변화를 확인합니다.
6. **Spawn Rate 또는 Spawn Burst 수정**: 계속 나오는 이펙트인지, 한 번 터지는 이펙트인지 결정합니다.
7. **레벨에 배치 후 Simulate/Play**: 에디터 미리보기만 믿지 말고 실제 레벨에서도 보이는지 확인합니다.

> [!IMPORTANT]
> **처음에는 한 번에 하나만 바꾸세요.**
> 초보자가 가장 많이 막히는 이유는 머터리얼, 스폰, 라이프타임, 바운드, 렌더러를 동시에 바꾸기 때문입니다. 먼저 Size 하나, Color 하나, Spawn 하나씩 바꾸며 “어느 조작이 화면에 어떤 변화를 만드는지” 연결하세요.

---

### 🧭 언리얼 에디터 화면 번역
- **Content Browser**: Unity의 Project 창입니다. 머터리얼, Niagara System, 텍스처, Blueprint를 저장합니다.
- **Viewport / Level Editor**: Unity의 Scene 창입니다. 이펙트를 배치하고 실제 크기감을 확인합니다.
- **Details Panel**: Unity의 Inspector 창입니다. 선택한 액터나 컴포넌트의 값을 수정합니다.
- **Blueprint Actor**: Unity의 Prefab과 MonoBehaviour 조합에 가깝습니다. 게임 로직과 컴포넌트를 묶어 재사용합니다.
- **Material Editor**: Unity Shader Graph와 비슷하지만, 언리얼의 PBR 입력과 머티리얼 인스턴스 구조를 함께 이해해야 합니다.
- **Niagara Stack**: Unity Particle System 모듈 목록과 비슷하지만, Spawn/Update/Render 단계가 더 명확하게 나뉩니다.

---

### 🔁 Unity Shuriken에서 넘어올 때 가장 먼저 외울 매핑
- **Particle System** → **Niagara System / Niagara Emitter**
- **Start Lifetime** → **Initialize Particle > Lifetime**
- **Start Size** → **Initialize Particle > Sprite Size**
- **Start Color** → **Initialize Particle > Color**
- **Emission > Rate over Time** → **Spawn Rate**
- **Emission > Burst** → **Spawn Burst Instantaneous**
- **Color over Lifetime** → **Scale Color**
- **Size over Lifetime** → **Scale Sprite Size**
- **Velocity over Lifetime** → **Add Velocity / Forces**
- **Noise** → **Curl Noise Force / Jitter Position**
- **Renderer** → **Sprite Renderer / Ribbon Renderer / Mesh Renderer**
- **Prefab에 붙여 재사용** → **Blueprint Actor 안에 Niagara Component로 배치**

---

### 🧪 첫 실습: 5분짜리 반짝 스파크
1. Content Browser에서 **Niagara System**을 새로 만들고 Empty Emitter로 시작합니다.
2. Particle Spawn에 **Initialize Particle**이 있는지 확인합니다.
3. Lifetime을 **0.4 ~ 0.8초**, Sprite Size를 **8 ~ 24**, Color를 노랑/주황 계열로 설정합니다.
4. Emitter Spawn에 **Spawn Burst Instantaneous**를 추가하고 Count를 **20 ~ 40**으로 둡니다.
5. Particle Spawn에 **Add Velocity in Cone**을 넣고 위쪽으로 퍼지게 만듭니다.
6. Particle Update에 **Drag**를 넣어 빠르게 튀었다가 속도가 줄어드는 느낌을 만듭니다.
7. Render의 **Sprite Renderer**가 켜져 있는지 확인하고 레벨에 배치합니다.

---

### 🛠 초보자 증상별 빠른 복구
- **아무것도 안 보임**: Sprite Renderer가 꺼져 있거나, Color Alpha가 0이거나, Lifetime이 너무 짧거나, 시스템이 레벨에 배치되지 않았을 수 있습니다.
- **에디터 미리보기에서는 보이는데 레벨에서 사라짐**: Niagara System의 Bounds가 너무 작을 수 있습니다. Fixed Bounds를 넉넉하게 잡아 확인합니다.
- **너무 작거나 너무 큼**: 언리얼 단위는 기본적으로 cm입니다. Sprite Size와 레벨 스케일을 같이 확인합니다.
- **머티리얼을 연결하니 검게 보임**: 머티리얼 Blend Mode, Shading Model, Emissive 입력, 텍스처 Alpha 연결을 확인합니다.
- **투명 이펙트가 너무 무거움**: 큰 반투명 Sprite가 화면에 많이 겹친 상태일 수 있습니다. 크기, 개수, Alpha 영역을 줄이고 6장의 Overdraw 항목으로 넘어갑니다.
- **Unity에서 쓰던 모듈 이름을 못 찾겠음**: 7장의 Unity to Unreal Migration 챕터를 먼저 열고 Shuriken 용어 기준으로 찾습니다.`
            },
            '1': {
                num: '01',
                title: '데칼 시스템 완전정복 (Decal Systems)',
                subtitle: '지면 마법진, 탄흔, 파편 그을음 Shading 및 Niagara 스폰 설계 가이드',
                content: `### 📖 Ch 1. 언리얼 데칼(Decal) 시스템 개요
언리얼 엔진 5(UE5)에서 지면에 생기는 충격파 마법진, 총알 탄흔, 폭발 탄화 흔적을 효율적으로 표현하기 위해 **Deferred Decal(데코레이터 데칼)** 시스템을 사용합니다. 
데칼은 볼륨(박스) 영역 안에 놓인 불투명 메쉬 표면에 머터리얼 데이터를 프로젝션하는 구조입니다.

---

### 🧊 1단계: 마스터 데칼 머터리얼 (Material) 설계
데칼 머터리얼은 일반 불투명 메쉬 셰이더와 설정이 다릅니다. 잘못 세팅하면 데칼이 투명해지거나 지면의 라이팅을 받지 못해 공중에 떠 보입니다.

> [!IMPORTANT]
> **DBuffer Decal 설정 필수 (UE5 마스터 꿀팁)**
> 프로젝트 세팅에서 **DBuffer Decals**가 활성화되어 있어야 하며, 데칼 머터리얼의 **Material Domain**을 **Deferred Decal**, **Blend Mode**를 **Translucent**, **Decal Blend Mode**를 **DBuffer Translucent Color Normal Roughness**로 지정해야 합니다. 이렇게 해야 가상 섀도 맵(VSM)이나 루멘 라이팅 환경에서 데칼이 지면의 그림자와 간접광의 영향을 받아 자연스럽게 녹아듭니다.

#### [데칼 핵심 노드 구성 가이드]
1. **기본 컬러(Base Color)**: 포화도가 높은 마법진 문양 텍스처나 탄흔 텍스처를 연결합니다.
2. **법선(Normal)**: 지면의 요철을 따라 데칼이 울퉁불퉁하게 보이도록 노멀 맵을 반드시 탑재합니다.
3. **오파시티(Opacity)**: 텍스처의 Alpha 채널에 **Depth Fade(뎁스 페이드)** 노드를 엮어, 데칼 박스 경계선이 각지게 끊기는 에러를 방지하고 부드럽게 감쇄시킵니다.
4. **발광(Emissive Color)**: 마법진처럼 빛나는 효과를 주려면 문양 마스크에 **Vector Parameter(컬러)**를 곱하고, 높은 상수(e.g., 30.0)를 곱해(Multiply) Emissive 핀에 주입합니다.

---

### 🌀 2단계: 나이아가라(Niagara) 연동 스폰 프로토콜
총알이 벽에 충돌하거나 마법 투사체가 땅에 닿았을 때 데칼이 정확히 스폰되도록 연동하는 기법입니다.

#### [나이아가라 충돌 데칼 스폰 가이드]
1. **Collision 모듈 탑재**: 이미터의 'Particle Update' 단계에 **Collision** 모듈을 배치하고 충돌 대상을 WorldStatic/WorldDynamic으로 설정합니다.
2. **Collision Event 생성**: 'Particle Update'에 **Generate Collision Event** 모듈을 추가하여 파티클이 지면에 부딪히는 정확한 좌표와 노멀(방향) 정보를 이벤트로 발송합니다.
3. **Event Handler 추가**: 이미터 하단에 **Event Handler Properties**를 추가하고 Source를 생성된 Collision Event로 바인딩합니다.
4. **Spawn Decal / Spawn Particle**: 이벤트 핸들러 하단에 **Spawn Particle**을 엮고, 파티클 스폰과 동시에 **Spawn Decal** 모듈을 호출하여 지면 법선(Normal)에 정확히 밀착하는 데칼을 스폰시킵니다.

---

### 🚀 3단계: 성능 최적화 (Optimization) 및 트러블슈팅
데칼은 오버드로(Overdraw)와 드로우콜을 대량 유발하는 원인 중 하나입니다. 다음 규칙을 철저히 지키십시오.

- **데칼 박스 볼륨 최소화**: 데칼 액터의 Scale(X, Y, Z)에서 Z축(두께)을 너무 길게 잡으면, 박스 위아래에 있는 다른 장애물이나 천장까지 데칼이 불필요하게 투사되는 리젝션(Rejection) 버그가 생깁니다. 투사 대상 두께에 맞춰 박스 깊이를 얇게 조정하십시오.
- **Fade Out 설정**: 데칼이 시간이 지남에 따라 점차 투명하게 사라지도록 머터리얼에 **Scalar Parameter(Fade)**를 세팅하고, 블루프린트의 **Decal Component -> Set Fade Out** 함수를 호출하여 렌더링 부하를 지워주어야 메모리가 고갈되지 않습니다.
- **데칼 섀도 끄기(Cast Shadow)**: 데칼 컴포넌트는 그림자를 드리울 필요가 없으므로 **Cast Shadow** 속성을 무조건 꺼 두어야 루멘 섀도 맵 연산 부하가 0으로 수렴합니다.`
            },
            '2': {
                num: '02',
                title: '디졸브 & 소멸 이펙트 (Dissolve & Fade)',
                subtitle: '나이아가라 Dynamic Parameter와 3D Noise를 활용한 실시간 오브젝트 소멸 설계',
                content: `### 📖 Ch 2. 디졸브(Dissolve) 소멸 이펙트 개요
디졸브는 몬스터가 죽을 때 불타 없어지거나, 캐릭터가 홀로그램처럼 스캔되며 맵으로 진입할 때 쓰이는 핵심 시각효과입니다. 
오브젝트 머터리얼과 나이아가라 파티클의 방출 타이밍을 프레임 단위로 완벽하게 조율해야 최상급 AAA 퀄리티가 나옵니다.

---

### 🧊 1단계: 마스터 디졸브 머터리얼 (Material) 설계
디졸브의 본질은 **"오브젝트 표면을 노이즈 그라데이션으로 마스킹하여 깎아내고, 그 경계면에 고열의 에너지를 심는 것"**입니다.

#### [디졸브 핵심 노드 구성 가이드]
1. **3D Noise / Noise Texture**: 텍스처 좌표나 **Absolute World Position(월드 좌표)** 노이즈 맵을 샘플링합니다. 월드 좌표를 쓰면 캐릭터가 움직여도 고정된 입체 공간을 깎아내므로 왜곡이 더 자연스럽습니다.
2. **보간 연산 (SmoothStep)**: 
   - 노이즈 값과 **Scalar Parameter('Dissolve Amount': 0~1)**를 비교합니다.
   - **SmoothStep** 노드를 이용해 디졸브가 깎여나가는 외곽선 경계를 날카롭거나 다소 부드럽게 필터링합니다.
3. **가장자리 타오르는 에지(Edge Glow) 구현**:
   - 'Dissolve Amount' 값에 미세 오프셋(예: 0.05)을 더한 마스크와 본래 마스크의 차(Subtract)를 구합니다.
   - 이 차이 구역(외곽 경계 띠)에 강력한 형광 오렌지/시안 발광 컬러를 곱하고 **Multiply 50.0**을 엮어 Emissive Color에 연결합니다.
4. **불투명 마스크(Opacity Mask)**: 블렌드 모드가 **Masked**인 머터리얼의 **Opacity Mask** 핀에 SmoothStep 연산 결과를 직결하여 구멍이 숭숭 뚫려 사라지는 모양새를 만듭니다.

---

### 🌀 2단계: 나이아가라(Niagara) 연동 및 실시간 파형 공유
캐릭터가 사라지는 정확한 경계 좌표에서 파열하는 불꽃(Embers)과 타오르는 연기를 나이아가라로 동시 방출해야 합니다.

> [!IMPORTANT]
> **Dynamic Parameter 링킹 (셰이더-파티클 데이터 가속)**
> 파티클 이미터에서 **Dynamic Parameter** 모듈을 추가합니다. 이를 통해 나이아가라 내부 변수(파티클의 Lifetime, Age, Curve 값)를 머터리얼의 **Dynamic Parameter** 노드로 즉각 주입할 수 있습니다. 수동으로 블루프린트를 코딩하지 않아도 파티클 각각의 생애 주기에 맞춰 디졸브가 알아서 깎여나갑니다.

#### [나이아가라 파티클 방출 프로토콜]
1. **Mesh 스폰 설정**: 'Particle Spawn' 단계에서 **Sample Static Mesh** 모듈을 배치해 캐릭터의 표면 뼈대 좌표를 실시간으로 샘플링합니다.
2. **스폰 영역 필터링**: 머터리얼의 디졸브 노이즈 임계값과 나이아가라의 임계값을 동기화하여, 캐릭터 표면 중 **현재 디졸브가 깎여나가 불타고 있는 외곽선 좌표에서만** 먼지/불티 파티클이 폭발적으로 스폰되도록 가중치 맵을 매칭합니다.

---

### 🚀 3단계: 성능 최적화 (Optimization) 및 트러블슈팅
- **Translucent 블렌드 모드 남용 금지**: 디졸브를 위해 머터리얼을 Translucent로 바꾸면 드로우콜 및 오버드로 렉이 심하게 발생합니다. 반드시 **Masked** 모드를 기본으로 사용하십시오. Masked 모드는 가상 섀도 맵 연산 시 불투명 판정을 효율적으로 처리하여 성능 저하가 극히 적습니다.
- **파편 스프라이트 최적화**: 깎여나가는 경계에서 스폰되는 불티 파티클들은 개수가 많으므로 무조건 **GPU Compute Sim** 타깃으로 잡고, 충돌 처리는 렉이 유발되는 물리 콜리전 대신 단순 대기 유체 감쇠(Drag) 및 벡터 필드로 대체하여 시각적 복잡도를 높이십시오.`
            },
            '3': {
                num: '03',
                title: '5대 원소별 이펙트 설계법 (Elemental Masterclass)',
                subtitle: '화염, 물, 번개, 바람, 얼음의 셰이더 및 이미터 마스터 배합 레시피',
                content: `### 📖 Ch 3. 원소별 이펙트 설계 개요
게임 속 마법 전투나 환경 비주얼을 다듬을 때 가장 기본이 되며, 가장 구현력이 엇갈리는 5대 원소의 마스터급 공식 배합법을 정립합니다.

---

### 1. 🔥 화염 (Fire & Thermal Glow)
- **시작 노드**: Texture Coordinate -> **Panner (Speed Y: -0.6)** -> 두 개의 노이즈 텍스처를 서로 반대 방향으로 교차 곱하기.
- **나이아가라 설정**: Initialize Particle (Lifetime: 0.6s ~ 1.2s). **Add Velocity Z축**으로 가속하고, **Drag** 모듈을 0.8 정도 주어 상승하다가 열기가 감쇠하며 퍼지는 자연스러운 화염 실루엣 유도.
- **최적화 핵심**: 불투명 화염은 오버드로의 주범입니다. 화염 스프라이트 안의 불필요한 투명 알파 영역을 쳐내는 **SubUV Cutout** 기능을 나이아가라 렌더러에서 반드시 켜십시오.

---

### 2. 🌊 물 & 물결 (Water, Ripple & Refraction)
- **시작 노드**: **Depth Fade** 노드를 활용하여 물이 지면, 바위와 포개지는 경계부에 흰색 거품(Foam) 텍스처를 매칭. Normal 맵을 패닝 스크롤한 뒤 **Refraction(굴절)**에 연결해 투명한 물리 굴절 구현.
- **나이아가라 설정**: 수면에 충돌할 때 **Spawn Burst Instantaneous (25~50개)** 파티클을 튀겨주고, 튀어나간 물방울에는 **Gravity(980)**를 가해 아치형으로 포물선 낙하 유도.
- **최적화 핵심**: 굴절 연산(Refraction)은 픽셀 셰이더 부하가 높으므로 모바일 빌드 타깃일 때는 굴절을 끄고 단순 불투명 컬러 블렌딩으로 연산 가중치를 낮추어야 합니다.

---

### 3. ⚡ 번개 & 전기 (Lightning & Jitter Ribbon)
- **시작 노드**: 번개는 구불구불 흐르는 네온 라인 셰이더가 중요합니다. 머터리얼 Emissive 강도를 80.0 이상 주며, **Sine** 파형과 시간에 따른 **Time** 파라미터로 눈부시게 깜빡이는 Flicker 효과 구성.
- **나이아가라 설정**: **Ribbon Renderer** 사용 필수. 파티클 업데이트 단계에 **Jitter Position(지터 포지션)** 모듈을 장착하여 지그재그로 미친 듯이 꺾이며 내려오는 물리적인 전기 아크 궤적을 난수 좌표로 도출합니다.
- **최적화 핵심**: 번개는 프레임 노출 수명이 길면 어색하고 렉이 걸립니다. 파티클의 Max Lifetime을 **0.05초 ~ 0.15초** 사이로 극히 짧게 설정하여 고속 순환시키십시오.

---

### 4. 🌀 바람 & 폭풍 (Wind & Rotary Vortex)
- **시작 노드**: 공기의 흐름은 눈에 보이지 않으므로 텍스처의 알파 마스크 선을 매우 얇게 다듬고, 디스토션(Distortion) 굴절 셰이더를 둘러 주변 배경 공간이 태풍처럼 회오리치게 왜곡시킵니다.
- **나이아가라 설정**: **Vortex Force** 모듈 장착 (중심 회전축 Z: 1.0, 회전 강도: 500). 파티클들이 중심축을 기준으로 원형 나선을 그리며 빠르게 상승하도록 설정합니다.
- **최적화 핵심**: 바람 이펙트는 크기가 매우 크므로 카메라 뷰에 꽉 차기 쉽습니다. 모바일/캐주얼 기기는 디스토션 강도 연산을 완전히 배제하고 불투명도가 흐릿한 단순 판화 구름 텍스처 스프라이트로 타협하십시오.

---

### 5. ❄️ 얼음 & 빙결 (Ice, SSS & Normal Displace)
- **시작 노드**: 얼음의 단단하고 반투명한 부피감을 위해 **Subsurface Scattering(SSS / 하부 표면 산란)** 셰이더 모드를 켜고 내부 광원 산란 값을 부여합니다. 거친 노말 맵과 Roughness 값 0.05~0.15 매칭으로 반짝이는 얼음 결정질 렌더링.
- **나이아가라 설정**: 고정된 메쉬 형태의 얼음 기둥 파편이 솟구치도록 **Mesh Renderer** 탑재. 파편이 솟구치는 순간 사방으로 미세 먼지 스노우 가루(Spawn Rate: 100)를 연동 스폰.
- **최적화 핵심**: 메쉬 렌더러는 폴리곤이 많으므로 원거리 LOD 단계에서 메시 파편 파티클 생성을 칼같이 완전 제한하는 거리에 따른 이미터 억제 옵션을 적용해야 합니다.`
            },
            '4': {
                num: '04',
                title: 'Niagara 모듈 레퍼런스 (Niagara Modules)',
                subtitle: 'Initialize Particle부터 Solver까지 핵심 기본 모듈 메뉴와 고급 커스텀 기능 분석',
                content: `### 📖 Ch 4. 나이아가라(Niagara) 시각 효과 가이드북
나이아가라(Niagara)는 에픽게임즈가 제공하는 차세대 실시간 파티클 및 이펙트 오케스트레이션 시스템입니다. 
공식 문서: [에픽게임즈 공식 나이아가라 이펙트 홈](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)

---

### 🧱 1단계: 나이아가라 핵심 아키텍처 및 스택 구조
나이아가라 시스템은 개별 파티클의 연산과 이펙트 렌더러를 **스택(Stack) 파이프라인** 형태로 쌓아 빌드합니다.

#### [나이아가라 스택 파이프라인 구성원]
1. **System State (시스템 상태)**: 시스템의 전역 수명(Life Cycle) 및 다중 이미터들의 활성화 상태를 관리합니다.
   * [시스템 상태 레퍼런스](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-key-concepts-in-unreal-engine)
2. **Emitter State (이미터 상태)**: 루프 주기(Loop Behavior), 이미터의 연산 타깃(CPU Sim vs GPU Compute Sim)을 관장합니다.
3. **Particle Spawn (파티클 스폰)**: 파티클이 처음 태어날 때 단 1프레임 동안 결정되는 초깃값을 정의합니다 (\`Initialize Particle\`, \`Add Velocity\`, \`Spawn Location\`).
4. **Particle Update (파티클 업데이트)**: 파티클이 수명 동안 매 프레임 살아움직이는 실시간 동적 연산을 정의합니다 (\`Apply Gravity\`, \`Drag\`, \`Curl Noise Force\`, \`Solve Forces\`).
5. **Render (렌더러)**: 계산 완료된 파티클의 3차원 위치 데이터를 모니터상의 픽셀이나 3D 메쉬로 전환 출력합니다 (\`Sprite\`, \`Ribbon\`, \`Mesh\`, \`Light\`).

> [!IMPORTANT]
> **GPU Compute Sim과 Fixed Bounds 설정 (AAA 필수)**
> 초당 만 개 이상의 입자가 날리는 불꽃이나 비산 먼지 효과는 이미터의 **Sim Target**을 반드시 **GPU Compute Sim**으로 전환하여 CPU 병목을 0으로 만들어야 합니다. 또한, GPU 시뮬레이션 시 카메라 움직임에 따라 이펙트가 갑자기 깜빡 소멸하는 현상을 예방하려면 Emitter Properties 하단에서 **Fixed Bounds (고정 경계)**를 넉넉하게 설정해야 합니다.

---

### 🌊 2단계: 나이아가라 플루이드(Niagara Fluids) 시뮬레이션
고퀄리티 연기, 기체 폭발, 액체 요동 등은 Navier-Stokes 방정식을 실시간으로 푸는 그리드 기반의 유체 시뮬레이션 모듈로 구현합니다.
공식 문서: [나이아가라 플루이드 가이드](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-fluids-in-unreal-engine)

- **2D Grid Gas/Water**: 얇은 막 형태의 화염 장벽이나 잔잔한 수면 물결 왜곡 연출에 활용하여 메모리 부하를 줄입니다.
- **3D Grid Gas/Water**: 3차원 전방위 입체 공간에서 뭉게구름처럼 퍼져나가는 대형 폭발 화염구와 수영장에 충돌하는 물결 기포 묘사에 사용합니다.

> [!WARNING]
> **플루이드 시뮬레이션의 최적화 규칙**
> Fluids 그리드 해상도(Resolution)를 과도하게 높이면 그래픽 카드 메모리 점유가 극도로 치솟아 모바일 및 저사양 콘솔에서 프레임이 심각하게 저하됩니다. 기획 의도에 맞춰 해상도 크기를 최소한으로 타협하고 저해상도 물리 그리드 위에 미세 불티 파티클을 얹는 식으로 보완하는 것이 실무 노하우입니다.

---

### 🎨 3단계: 스크래치 패드(Scratch Pad)를 통한 커스텀 모듈 스크립팅
나이아가라는 기본 노드 블록 외에도 디렉셔널 맵, 로직을 직접 프로그래밍하는 스크래치 패드 기능을 제공합니다.
공식 문서: [나이아가라 스크래치 패드 사용법](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-scratch-pad-in-unreal-engine)

- **Niagara Script Editor**: 커스텀 HLSL 코드를 주입하거나, 복잡한 Vector 연산(외적, 내적, 삼각함수 파형)을 모듈화하여 재사용 가능한 커스텀 파라미터 제어 블록을 제작합니다.
- **Dynamic Parameter 원격 전달**: 스크래치 패드에서 연산된 동적 값들을 머터리얼의 Dynamic Parameter 노드에 주입해, 파티클 각각의 비행 경로 곡선과 셰이더 왜곡 강도를 정확히 연계합니다.`
            },
            '5': {
                num: '05',
                title: 'Material 노드 레퍼런스 (Material Expressive)',
                subtitle: '수학 노드부터 UV 디스토션, Fresnel, Depth Fade 등 실무 VFX 노드 가이드',
                content: `### 📖 Ch 5. 언리얼 엔진 머티리얼(Materials) 가이드북
머티리얼(Material)은 오브젝트의 표면 속성(색상, 반사율, 투명도, 굴절률 등)을 정의하고 픽셀 셰이더의 최종 렌더링 연산을 처리하는 핵심 시스템입니다.
공식 문서: [에픽게임즈 공식 머티리얼 개요](https://dev.epicgames.com/documentation/en-us/unreal-engine/materials-in-unreal-engine)

---

### 🎨 1단계: 물리 기반 렌더링(PBR) 입력단 완전 정복
언리얼의 메인 셰이딩 모델은 현실의 빛 반사를 수학적으로 계산하는 **Physically Based Rendering (PBR)**을 따릅니다.
공식 문서: [물리 기반 머티리얼 속성 구성](https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine)

#### [PBR 6대 마스터 입력 핀 가이드]
1. **Base Color (기본 컬러)**: 물체 고유의 반사광 색상입니다. 순수 반사값이며 그림자나 광원 음영 정보가 텍스처에 포함되지 않은 플랫한 컬러여야 루멘(Lumen)이 정확히 작동합니다.
2. **Metallic (메탈릭)**: 물체의 금속성 수준(0.0: 비금속, 1.0: 금속)입니다. 중간값보다는 보통 0 또는 1로 확실히 이분화하는 것이 자연스럽습니다.
3. **Specular (스펙큘러)**: 비금속성 표면의 미세한 거울 반사 강도(0.0~1.0, 기본값 0.5)를 정밀 조정합니다.
4. **Roughness (러프니스)**: 물체 표면의 거칠기 수준(0.0: 완전 거울 반사, 1.0: 난반사 무광)입니다. 이펙트 파편이나 물방울은 0.05~0.15로 팽팽하게 세팅해야 반사 하이라이트 광채가 맺힙니다.
5. **Emissive Color (발광 컬러)**: 셰이더 자체 발광 효과입니다. 빛을 반사하는 것이 아닌 자체 발산이므로, 컬러 벡터에 높은 가상 값(e.g., 30.0)을 곱하면 톤맵퍼(ACES)를 뚫고 찬란하게 빛나는 네온 글로우 이펙트를 만들 수 있습니다.
6. **Normal (법선)**: 메쉬의 폴리곤 면을 물리적으로 직접 늘리지 않고도, 빛의 방향을 가짜로 왜곡하여 표면 요철(돌기, 크랙, 엠보싱) 질감을 정밀 묘사합니다.

---

### ⚡ 2단계: 머티리얼 인스턴스(Material Instance) 최적화
부모 마스터 머티리얼의 셰이더 코드를 그대로 공유하면서, 텍스처나 일부 물리 매개변수만 바꿔 사용하는 경량 파생 기법입니다.
공식 문서: [머티리얼 인스턴싱 가이드](https://dev.epicgames.com/documentation/en-us/unreal-engine/material-instancing-in-unreal-engine)

- **Material Instance Constant**: 게임 플레이 중 정적으로 변하지 않는 인스턴스입니다. 컴파일 타임이 극단적으로 짧고 그래픽 드로우콜(Draw Call)을 병합 배칭하기에 최적의 성능을 냅니다.
- **Dynamic Material Instance (MID)**: 게임 실행 도중 C++ 또는 블루프린트의 \`Set Scalar Parameter Value\` 등으로 실시간 파라미터를 조작할 수 있는 동적 인스턴스입니다. 캐릭터의 대미지 흔적이나 순간 소멸 디졸브에 주입 링킹합니다.

---

### 📦 3단계: 머티리얼 함수(Material Functions) 라이브러리
여러 머티리얼에서 중복해 사용되는 공통 노드 구조(e.g., 커스텀 노이즈 생성, 바람 흔들림 변형)를 하나의 패키지 블록으로 묶어 재사용하는 기능입니다.
공식 문서: [머티리얼 함수 구현 및 활용](https://dev.epicgames.com/documentation/en-us/unreal-engine/material-functions-in-unreal-engine)

- **입출력 구성**: \`Function Input\`과 \`Function Output\` 노드를 그래프에 구성하고, 마스터 머티리얼에서 이를 커스텀 복합 노드처럼 얹어 복잡도를 낮춥니다.
- **유지보수 가중**: 공통 셰이딩 모델의 일괄 수정 시, 부모 함수만 고치면 이를 상속하는 모든 마스터 머티리얼에 일제히 실시간 자동 갱신 적용되므로 개발 오버헤드를 획기적으로 줄여줍니다.`
            },
            '6': {
                num: '06',
                title: 'VFX 최적화 & 프로파일링 백서 (VFX Optimization)',
                subtitle: 'Overdraw 디버깅, LOD 기법, Particle Pooling 등 상용 배포 최적화 규칙',
                content: `### 📖 Ch 6. VFX 최적화의 의의
아무리 화려한 이펙트라도 프레임 드랍(렉)을 유발하면 최종 배포 단계에서 탈락합니다. 특히 캐주얼 플랫폼(모바일)과 하이엔드 AAA 콘솔 환경은 렌더링 파이프라인 사양이 극과 극이므로 각각의 기준을 정밀 매칭해야 합니다.

---

### 🚀 1. 오버드로 (Overdraw) 지옥 탈출법
- **발생 원인**: 투명도가 들어간 반투명(Translucent) 머터리얼 파티클이 카메라 뷰포트 내에 여러 장 겹치면 그래픽카드는 동일한 화면 픽셀을 중복해서 연산해야 하므로 성능이 기하급수적으로 고갈됩니다.
- **디버깅 프로토콜**: 에디터 좌상단 [View Mode -> Optimization Viewmodes -> Shader Complexity]를 켜십시오. 파티클 겹침 부위가 붉은색을 넘어 **하얗게(White)** 타오르면 성능 경고 수준입니다.
- **마스터 해결책**:
  * 파티클 텍스처 내부의 빈 투명 영역(Margin)을 지오메트리 버텍스로 깎아내 알파 면적을 줄이는 **SubUV Cutout** 기능을 나이아가라 렌더러에서 활성화하십시오.
  * 스프라이트 100장을 겹치기보다, 크기가 크고 디테일한 셰이더가 들어간 10장의 파티클로 밀도감을 속이는 시각적 타협이 필요합니다.

---

### 🚀 2. 나이아가라 시스템 풀링 (Niagara System Pooling)
- **발생 원인**: 캐릭터가 타격 당할 때 터지는 피격 이펙트, 걷거나 달릴 때 생기는 먼지 등은 매 프레임 수없이 생성(Spawn)되고 소멸(Destroy)합니다. 이때 매번 인스턴스를 메모리에 할당/해제하면 가비지 컬렉션(GC) 부하로 인해 게임이 끊기는 프리징(Spike)이 일어납니다.
- **마스터 해결책**: 
  * 나이아가라 시스템 세팅에서 **System Pooling** 옵션을 **Enabled**로 전환해 둡니다.
  * 블루프린트에서 이펙트를 스폰할 때 'Spawn System at Location' 함수 내부의 **Pooling Method** 매개변수를 'Auto Release'로 엮어 줍니다. 시스템 인스턴스를 파괴하지 않고 메모리 풀에 고이 살려두어 다음 타격 시 즉각 재활용하여 끊김 현상을 원천 방어합니다.

---

### 🚀 3. LOD - Level of Detail (원거리 이미터 감쇄 설계)
- **발생 원인**: 플레이어와 수십 미터 떨어진 아주 멀리서 아군이나 적이 생성하는 파티클은 픽셀 크기가 극히 미세함에도 불구하고 똑같은 수의 연산을 처리하는 사치 자원이 발생합니다.
- **마스터 해결책**: 
  * 나이아가라 이미터 세팅에서 **LOD** 단계를 활성화하여 거리에 기반한 스폰 감소 곡선(Distance-based Spawn Scaling)을 적용하십시오.
  * 먼 거리에 있을 때는 파티클 개수를 70%~90% 감쇄하거나 무거운 리본/라이트 렌더러를 자동으로 완전히 비활성화(Deactivate)하도록 거리에 따른 렌더 스케일을 세밀하게 묶어주어 프레임 드랍을 사전에 차단하십시오.`
            },
            '7': {
                num: '07',
                title: 'Unity → Unreal 마이그레이션 레퍼런스 (Unity to Unreal Migration)',
                subtitle: 'Unity Shuriken 파티클 모듈에 1:1 매핑되는 Niagara 모듈 및 Material 노드 가이드',
                content: `### 📖 Ch 7. 유니티에서 언리얼 엔진 5로의 VFX 이식
유니티의 Shuriken 파티클 시스템에 익숙한 이펙터 및 Technical Artist가 언리얼의 나이아가라(Niagara) 파티클 프레임워크와 머터리얼 노드로 원활하게 전환할 수 있도록 메뉴 및 속성 매핑을 정리한 전환 레퍼런스입니다.

---

### 🧬 스폰 및 물리 모듈 이식 개요
- 유니티의 Shuriken은 고정된 단일 파라미터 리스트 구조를 취하고 있으나, 언리얼의 나이아가라는 완전한 모듈러 스택 형태를 취합니다.
- 원하는 거동 모듈(예: Curl Noise, Wind Force)을 업데이트 스택에 언제든지 다중 추가하고, 속성을 머터리얼 노드로 실시간 전달하는 Dynamic Parameter 구조를 활용하여 한 차원 높은 자유도를 구사할 수 있습니다.`
            },
            '8': {
                num: '08',
                title: 'UE 5.7 공식 문서 심화 레퍼런스',
                subtitle: 'Niagara, Material Editor, Content Browser, Post Process 문서를 실무 VFX 관점으로 정리',
                content: `### UE 5.7 공식 문서 심화 레퍼런스
첨부된 심화 보고서의 핵심 축을 앱 안에서 바로 찾을 수 있도록 정리한 공식 문서 기반 레퍼런스입니다. 이 장은 제작 레시피가 아니라 **어떤 메뉴와 공식 문서를 봐야 하는지**를 빠르게 판단하기 위한 인덱스입니다.

---

### 1. Niagara 공식 문서 축
- **Niagara Overview**: System, Emitter, Module, Parameter의 관계를 먼저 확인합니다.
- **System / Emitter Module Reference**: Spawn, Update, Event, Renderer 모듈의 실제 이름과 용도를 찾는 기준 문서입니다.
- **Niagara Blueprint API**: Actor, Component, Blueprint에서 Niagara를 Spawn/Attach/Activate하거나 User Parameter를 넘길 때 확인합니다.
- **Niagara Fluids / Scratch Pad / Data Channels**: 시니어 이펙터가 커스텀 모듈, 유체, 게임플레이 데이터 연동을 설계할 때 참고합니다.

**실무 체크포인트**
- 질문이 "어디에 넣어야 해?"라면 Stack 위치를 나눕니다: System, Emitter, Particle Spawn, Particle Update, Renderer.
- 질문이 "왜 레벨에서 사라져?"라면 Fixed Bounds, Component 활성화, Auto Destroy, LOD/Scalability 순서로 봅니다.
- 질문이 "모바일 가능해?"라면 Particle Count보다 Overdraw, Renderer, Collision/Event 사용 여부를 먼저 줄입니다.

---

### 2. Material Editor 공식 문서 축
- **Material Editor User Guide**: 노드 그래프 UI, Material 생성 흐름, Details 패널의 기본 구조를 확인합니다.
- **Material Properties**: Blend Mode, Shading Model, Two Sided, Translucency, Refraction 같은 최종 렌더링 동작을 판단합니다.
- **Material Expressions Reference**: Panner, Fresnel, DepthFade, Lerp, ComponentMask, Texture Sample 같은 노드의 정확한 입력/출력 의미를 확인합니다.
- **Material Functions / Material Instances**: 반복되는 VFX 노드 묶음과 런타임 파라미터 제어를 실무 자산화할 때 참고합니다.

**실무 체크포인트**
- VFX 머터리얼은 보통 Emissive, Opacity/Opacity Mask, Normal, Refraction, World Position Offset 중 어느 출력이 목표인지 먼저 정합니다.
- 노드 프리셋은 "없는 효과 노드"가 아니라 실제 Material Expression과 Material Output 입력의 조합으로 읽어야 합니다.
- 모바일/캐주얼은 Refraction, SceneDepth, 복잡한 Noise보다 Packed Mask, Flipbook, Additive/Masked 구성을 우선합니다.

---

### 3. Content Browser / 콘텐츠 활용 공식 문서 축
- **Content Browser**: 에셋 생성, 가져오기, 검색, 필터, 컬렉션, 마이그레이션의 중심입니다.
- **Content Browser Interface**: 폴더, 필터, 에셋 뷰, 우클릭 액션, 컬렉션 위치를 확인합니다.
- **Migrating Assets**: 다른 프로젝트로 Niagara System, Material, Texture, Static Mesh를 옮길 때 참조 누락을 피하기 위한 기준입니다.

**실무 체크포인트**
- VFX 에셋은 \`FX/Niagara\`, \`FX/Materials\`, \`FX/Textures\`, \`FX/Meshes\`, \`FX/Flipbooks\`처럼 역할별 폴더를 분리합니다.
- Material Instance와 Texture가 누락되면 Niagara만 복사해도 결과가 검게 보이거나 투명해질 수 있습니다.
- 프로젝트 간 이동은 복사 붙여넣기보다 Migrate 흐름을 우선하고, Redirector 정리까지 확인합니다.

---

### 4. Post Process 공식 문서 축
- **Post Process Effects**: Post Process Volume과 Camera를 통해 Bloom, Exposure, Color Grading, Tonemapping, Depth of Field 등을 제어합니다.
- **Post Process Materials**: SceneTexture, Custom Depth, Stencil, Blendable Location을 이용해 화면 공간 VFX를 구성합니다.
- **Color Grading / Exposure / Bloom**: VFX의 Emissive 강도와 실제 화면 밝기가 어떻게 보정되는지 판단하는 기준입니다.

**실무 체크포인트**
- 강한 Emissive 이펙트는 Material만 보지 말고 Bloom, Exposure, Tonemapper와 함께 봐야 합니다.
- 전체 화면 피격, 스캔라인, 열화상, 글리치, 외곽선은 Post Process Material 후보입니다.
- UI처럼 항상 선명해야 하는 요소와 월드 VFX처럼 Bloom 영향을 받아야 하는 요소를 구분합니다.

---

### 공식 문서 바로가기
- [Niagara Overview](https://dev.epicgames.com/documentation/unreal-engine/overview-of-niagara-effects-for-unreal-engine?lang=en-US)
- [Niagara Module Reference](https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine)
- [Material Editor User Guide](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-editor-user-guide)
- [Material Properties](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-material-properties?lang=en-US)
- [Content Browser](https://dev.epicgames.com/documentation/unreal-engine/content-browser-in-unreal-engine?lang=en-US)
- [Content Browser Interface](https://dev.epicgames.com/documentation/unreal-engine/content-browser-interface-in-unreal-engine)
- [Post Process Effects](https://dev.epicgames.com/documentation/unreal-engine/post-process-effects-in-unreal-engine)`
            }
        };
 
        // Complete detailed VFX keyword dictionary
        this.glossary = {
            '초보': this.chapters['0'],
            '입문': this.chapters['0'],
            '처음': this.chapters['0'],
            '시작': this.chapters['0'],
            '로드맵': this.chapters['0'],
            '안 보임': this.chapters['0'],
            '안보임': this.chapters['0'],
            '사라짐': this.chapters['0'],
            'prefab': this.chapters['0'],
            'inspector': this.chapters['0'],
            'project 창': this.chapters['0'],
            'start lifetime': this.chapters['0'],
            'start size': this.chapters['0'],
            '데칼': this.chapters['1'],
            'decal': this.chapters['1'],
            '디졸브': this.chapters['2'],
            'dissolve': this.chapters['2'],
            '화염': this.chapters['3'],
            '불': this.chapters['3'],
            '물': this.chapters['3'],
            '물결': this.chapters['3'],
            '번개': this.chapters['3'],
            '전기': this.chapters['3'],
            '바람': this.chapters['3'],
            '폭풍': this.chapters['3'],
            '얼음': this.chapters['3'],
            '나이아가라': this.chapters['4'],
            'niagara': this.chapters['4'],
            '머터리얼': this.chapters['5'],
            '노드': this.chapters['5'],
            'panner': this.chapters['5'],
            'lerp': this.chapters['5'],
            'fresnel': this.chapters['5'],
            'depth fade': this.chapters['5'],
            '최적화': this.chapters['6'],
            'overdraw': this.chapters['6'],
            '오버드로': this.chapters['6'],
            '유니티': this.chapters['7'],
            'unity': this.chapters['7'],
            '이식': this.chapters['7'],
            'shuriken': this.chapters['7'],
            'ue 5.7': this.chapters['8'],
            '공식 문서': this.chapters['8'],
            'official docs': this.chapters['8'],
            'content browser': this.chapters['8'],
            'content': this.chapters['8'],
            '콘텐츠': this.chapters['8'],
            'post process': this.chapters['8'],
            'postprocess': this.chapters['8'],
            '포스트프로세스': this.chapters['8'],
            'material editor': this.chapters['8'],
            '머터리얼 에디터': this.chapters['8']
        };

        this.officialDocs = {
            niagara: [
                ['Niagara Reference', 'https://dev.epicgames.com/documentation/unreal-engine/reference-for-niagara-effects-in-unreal-engine'],
                ['Niagara System and Emitter Module Reference', 'https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine'],
                ['Niagara Render Module Reference', 'https://dev.epicgames.com/documentation/unreal-engine/render-module-reference-for-niagara-effects-in-unreal-engine?lang=en-US']
            ],
            material: [
                ['Unreal Engine Materials', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials'],
                ['Material Editor User Guide', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-editor-user-guide'],
                ['Material Parameter Expressions', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-parameter-expressions-in-unreal-engine'],
                ['Material Properties', 'https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-material-properties?lang=en-US'],
                ['Custom Material Expressions', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/custom-material-expressions-in-unreal-engine']
            ],
            actor: [
                ['Basic Components', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/basic-components-in-unreal-engine'],
                ['Components Window', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/components-window-in-unreal-engine'],
                ['Niagara Blueprint API', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/Niagara']
            ],
            optimization: [
                ['Niagara Reference', 'https://dev.epicgames.com/documentation/unreal-engine/reference-for-niagara-effects-in-unreal-engine'],
                ['Niagara System and Emitter Module Reference', 'https://dev.epicgames.com/documentation/unreal-engine/system-and-emitter-module-reference-for-niagara-effects-in-unreal-engine'],
                ['Unreal Engine Materials', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials']
            ],
            content: [
                ['Content Browser', 'https://dev.epicgames.com/documentation/unreal-engine/content-browser-in-unreal-engine?lang=en-US'],
                ['Content Browser Interface', 'https://dev.epicgames.com/documentation/unreal-engine/content-browser-interface-in-unreal-engine'],
                ['Migrating Assets', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/migrating-assets-in-unreal-engine']
            ],
            postprocess: [
                ['Post Process Effects', 'https://dev.epicgames.com/documentation/unreal-engine/post-process-effects-in-unreal-engine'],
                ['Post Process Materials', 'https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials-in-unreal-engine'],
                ['Material Properties', 'https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-material-properties?lang=en-US']
            ]
        };
    }
    
    setMode(style, tier) {
        this.selectedStyle = style;
        this.selectedTier = tier;
    }
    
    getChapter(id) {
        return this.chapters[id] || null;
    }
    
    processQuery(query) {
        const cleaned = query.trim().toLowerCase();
        
        if (!cleaned) {
            return '질문이 비어있습니다. 궁금한 대상(예: Actor에 Niagara 붙이기, 모바일 Niagara 최적화, 데칼이 안 보임, 머티리얼 노드)을 적어주세요.';
        }

        const officialIntent = this.inferOfficialDocsIntent(cleaned);
        if (officialIntent) return this.buildIntentAnswer(query, cleaned, officialIntent);

        const intent = this.inferQuestionIntent(cleaned);
        if (intent) return this.buildIntentAnswer(query, cleaned, intent);

        const matchChapter = this.findReferenceChapter(cleaned);
        if (matchChapter) return this.buildReferenceAnswer(query, matchChapter);

        return this.buildOpenEndedAnswer(query, cleaned);
    }

    hasAny(text, words) {
        return words.some(word => text.includes(word));
    }

    inferOfficialDocsIntent(cleaned) {
        if (this.hasAny(cleaned, ['content browser', 'content drawer', 'asset', 'assets', 'migrate', 'redirector', 'folder', '콘텐츠', '에셋', '마이그레이트', '폴더'])) {
            return 'contentWorkflow';
        }
        if (this.hasAny(cleaned, ['post process', 'postprocess', 'post-processing', 'post processing', 'bloom', 'exposure', 'color grading', 'tonemapper', 'tonemapping', 'custom depth', 'stencil', '포스트프로세스', '블룸', '노출', '컬러 그레이딩', '톤매퍼', '커스텀 뎁스'])) {
            return 'postProcess';
        }
        if (this.hasAny(cleaned, ['material editor', 'material properties', 'material instance', 'material function', '머터리얼 에디터', '머티리얼 에디터', '머터리얼 인스턴스', '머터리얼 함수'])) {
            return 'materialEditor';
        }
        if (this.hasAny(cleaned, ['ue 5.7', 'official docs', '공식 문서', '공식문서', '문서 심화'])) {
            return 'officialDocsDeepDive';
        }
        return null;
    }

    inferQuestionIntent(cleaned) {
        const isMobile = this.hasAny(cleaned, ['모바일', 'mobile', '저사양', '캐주얼', 'casual', '스위치', 'switch', 'ios', 'android']);
        const isNiagara = this.hasAny(cleaned, ['나이아', '나이아가라', 'niagara', '이미터', 'emitter', '파티클', 'particle', 'gpu sim', 'cpu sim']);

        if (this.hasAny(cleaned, ['액터', 'actor', '블루프린트', 'blueprint', '컴포넌트', 'component', 'spawn actor', '붙이', '부착', 'attach'])) {
            return 'actorBlueprint';
        }
        if (isMobile && isNiagara) {
            return 'mobileNiagara';
        }
        if (isMobile && this.hasAny(cleaned, ['머터리얼', 'material', '셰이더', 'shader', '노드', 'node', '오버드로', 'overdraw'])) {
            return 'mobileMaterial';
        }
        if (this.hasAny(cleaned, ['어디', '메뉴', '위치', '찾', '버튼', '패널', '창', '열', 'tab', '탭', '사양', '플랫폼'])) {
            return 'menuHelp';
        }
        if (this.hasAny(cleaned, ['안 보', '안보', '사라', '검게', '투명', '깨', '오류', '문제', '왜 안', '안나', '안 나'])) {
            return 'troubleshooting';
        }
        if (this.hasAny(cleaned, ['최적화', '성능', '프레임', 'fps', '무거', '스파이크', '메모리', 'overdraw', '오버드로', '프로파일'])) {
            return 'optimization';
        }
        if (isNiagara) {
            return 'niagara';
        }
        if (this.hasAny(cleaned, ['머터리얼', 'material', '셰이더', 'shader', '노드', 'node', 'fresnel', 'panner', 'depth fade', 'lerp'])) {
            return 'material';
        }
        if (this.hasAny(cleaned, ['유니티', 'unity', 'shuriken', 'prefab', 'inspector', 'start lifetime', 'start color'])) {
            return 'unityMigration';
        }
        if (this.hasAny(cleaned, ['데칼', 'decal', '디졸브', 'dissolve', '화염', '불', '물', '번개', '바람', '얼음', '원소'])) {
            return 'technique';
        }
        return null;
    }

    findReferenceChapter(cleaned) {
        for (let key in this.glossary) {
            if (cleaned.includes(key)) return this.glossary[key];
        }
        return null;
    }

    buildIntentAnswer(originalQuery, cleaned, intent) {
        const profileLine = this.selectedTier === 'casual'
            ? '현재 프로파일은 **Casual/모바일 기준**이므로 파티클 수, 반투명 면적, 텍스처 샘플 수를 먼저 줄이는 방향이 좋습니다.'
            : '현재 프로파일은 **AAA Console/PC 기준**이므로 GPU Sim, Fixed Bounds, 고품질 Material Technique까지 확장해도 됩니다.';

        const answers = {
            officialDocsDeepDive: `### UE 5.7 공식 문서 심화 레퍼런스 안내
첨부 보고서의 핵심 분류는 **Niagara / Material Editor / Content Browser / Post Process** 네 축으로 정리해서 앱에 추가했습니다.

#### 앱에서 볼 위치
- **Production Guide > UE 5.7 공식 문서 심화**
- Q&A에서 "Content Browser", "Material Editor", "Post Process", "Bloom", "에셋 마이그레이트" 같은 키워드로 바로 질문

#### 실무적으로 읽는 순서
1. 에셋과 폴더 구조가 궁금하면 Content Browser 문서
2. 노드 그래프와 머터리얼 속성이 궁금하면 Material Editor / Material Properties 문서
3. 파티클 구조와 Blueprint 연동이 궁금하면 Niagara Overview / Niagara Blueprint API
4. Bloom, Exposure, 화면 전체 효과가 궁금하면 Post Process Effects 문서`,

            contentWorkflow: `### Content Browser / 콘텐츠 활용 답변
Content Browser는 Unreal 프로젝트의 에셋 생성, 검색, 필터링, 폴더 관리, 마이그레이션을 담당하는 중심 영역입니다.

#### VFX 실무 폴더 기준
- **FX/Niagara**: Niagara System, Emitter
- **FX/Materials**: Master Material, Material Instance, Material Function
- **FX/Textures**: Noise, Flipbook, Mask, Normal
- **FX/Meshes**: Mesh Particle용 Static Mesh
- **FX/PostProcess**: Post Process Material, LUT, 화면 효과 자산

#### 자주 생기는 문제
- Niagara만 옮기고 Material/Texture를 빼먹으면 검게 보이거나 투명해질 수 있습니다.
- 프로젝트 간 복사는 Windows 복사보다 **Migrate**를 우선하세요. 참조된 에셋까지 함께 옮기는 흐름이 안전합니다.
- 폴더 이동 후 이상하면 Redirector 정리를 확인하세요.

#### 앱에서 이어서 볼 곳
- **Production Guide > UE 5.7 공식 문서 심화**
- **Material Technique Library**: 사용 중인 Material/Texture 패턴 확인
- **Niagara System Planner**: 에셋 구성을 기준으로 시스템 설계`,

            postProcess: `### Post Process / 화면 공간 VFX 답변
Post Process는 머터리얼 하나의 표면 효과가 아니라, 카메라가 보는 최종 화면에 Bloom, Exposure, Color Grading, Tonemapping, Depth of Field, 화면 공간 Material을 적용하는 영역입니다.

#### VFX에서 먼저 보는 항목
- **Bloom**: Emissive가 실제 화면에서 번지는 정도
- **Exposure**: 자동 노출 때문에 이펙트가 갑자기 어둡거나 밝아지는 문제
- **Color Grading / Tonemapper**: 최종 색감, 콘트라스트, 하이라이트 압축
- **Post Process Material**: 화면 피격, 스캔라인, 열화상, 글리치, 외곽선, Custom Depth/Stencil 효과

#### 판단 기준
- 오브젝트 표면에 붙는 효과면 Material / Niagara 쪽을 먼저 봅니다.
- 화면 전체가 변하는 효과면 Post Process Volume 또는 Camera Post Process를 봅니다.
- 강한 Emissive 이펙트는 Material 값만 맞춰도 Bloom/Exposure 설정에 따라 전혀 다르게 보일 수 있습니다.

#### 앱에서 이어서 볼 곳
- **Production Guide > UE 5.7 공식 문서 심화**
- **Material Technique Library > Cyber Glitch / Emissive Boost**
- **Production Guide > 성능 최적화 & 프로파일링**`,

            materialEditor: `### Material Editor / 머터리얼 에디터 답변
Material Editor는 노드 기반 그래프에서 표면 속성과 VFX 출력을 만드는 영역입니다. 질문을 볼 때는 "어떤 노드를 써야 하나"보다 먼저 **어떤 Material Output 입력을 만들 것인가**를 정하는 게 좋습니다.

#### 출력 목표별 기준
- **Emissive**: 발광, 오라, 번개, UI형 VFX
- **Opacity / Opacity Mask**: 연기, 디졸브, 소프트 페이드, Masked 컷아웃
- **Normal**: 충격파, 물결, 데칼 표면 요철
- **Refraction**: 열기, 물, 유리, 왜곡
- **World Position Offset**: 흔들림, 파도, 메쉬 변형

#### 실무 체크포인트
- Blend Mode와 Shading Model은 Main Material Node 선택 후 Details에서 확인합니다.
- 반복되는 노드 묶음은 Material Function으로 빼고, 프로젝트별 수치는 Material Instance로 노출합니다.
- 모바일/캐주얼은 Texture Sample 수, Refraction, SceneDepth, Translucent Overdraw를 먼저 줄입니다.

#### 앱에서 이어서 볼 곳
- **Material Technique Library**
- **Production Guide > UE 5.7 공식 문서 심화**
- **Production Guide > Material 노드 레퍼런스**`,

            actorBlueprint: `### Actor / Blueprint 기준 답변
질문이 Actor 또는 Blueprint 쪽으로 해석됩니다. 이 경우 머터리얼 노드부터 설명하기보다 **Niagara Component를 Actor에 어떻게 소유시킬지**가 먼저입니다.

#### 권장 구조
- **반복 사용 이펙트**: Blueprint Actor 안에 **Niagara Component**를 추가하고, 필요할 때 Activate/Deactivate로 제어합니다.
- **일회성 폭발/피격**: Blueprint나 C++에서 **Spawn System at Location / Attached**로 생성하고 Auto Destroy 또는 Pooling을 켭니다.
- **캐릭터 소켓 부착**: Skeletal Mesh의 Socket 이름에 맞춰 **Spawn System Attached**를 사용합니다. 검기, 버프 오라, 발밑 먼지는 이 방식이 안정적입니다.
- **파라미터 전달**: Actor 변수 값을 Niagara User Parameter로 넘기고, Niagara에서 Dynamic Parameter 또는 Renderer Binding으로 Material에 전달합니다.

#### 자주 막히는 지점
- 레벨에서 안 보이면 Component가 비활성화됐거나 Auto Activate가 꺼져 있을 수 있습니다.
- 캐릭터 이동 중 위치가 틀어지면 World Space/Local Space, Attach Location Rule을 확인하세요.
- 반복 스폰이 많으면 Actor를 계속 생성하지 말고 Niagara Component 재사용 또는 Pooling을 검토하세요.

#### 관련 메뉴
- **Production Guide > 입문 로드맵**: Actor, Component, Blueprint 개념 번역
- **Production Guide > Niagara 모듈 레퍼런스**: Niagara Stack과 User Parameter 이해
- **Niagara System Planner**: 어떤 Renderer/Spawn 구조를 쓸지 선택`,

            mobileNiagara: `### 모바일 Niagara 사양 기준 답변
질문은 모바일/저사양 Niagara 최적화로 해석됩니다. 모바일에서는 “GPU가 빠르다”보다 **반투명 오버드로, 파티클 개수, 머티리얼 샘플 수**가 먼저 병목이 됩니다.

#### 모바일 권장 기준
- **Sim Target**: 단순 Sprite는 CPU Sim도 충분합니다. 대량 파티클이라도 모바일 GPU Compute 지원과 발열을 먼저 확인하세요.
- **Spawn Count**: 화면 가까운 이펙트는 Burst 10~40, 지속형 Spawn Rate는 초당 10~60부터 시작하세요.
- **Renderer**: Sprite 중심으로 가고, Mesh Renderer/Light Renderer는 매우 제한적으로 씁니다.
- **Bounds**: Fixed Bounds는 꼭 잡되, 너무 크게 잡으면 불필요하게 계속 렌더됩니다.
- **Collision/Event**: 실시간 Collision Event는 모바일에서 비쌉니다. 필요하면 바닥 히트 위치를 Blueprint에서 한 번 계산해 넘기는 방식이 낫습니다.
- **텍스처**: Flipbook/SubUV를 적극 활용하고, 실시간 Fluids/복잡한 Curl Noise는 피합니다.

#### 관련 메뉴
- **Production Guide > 성능 최적화 & 프로파일링**: Overdraw, LOD, Pooling
- **Material Technique Library > Mobile Additive Sprite**
- **Material Technique Library > Channel Packed Masks**
- **Material Technique Library > Cheap Procedural Noise**
- **Niagara System Planner**: 플랫폼을 Casual로 놓고 구성안 생성

${profileLine}`,

            mobileMaterial: `### 모바일 Material / Shader 기준 답변
모바일 VFX 머티리얼은 “멋진 노드”보다 **샘플 수, Blend Mode, 화면 점유율**을 관리하는 쪽이 품질을 좌우합니다.

#### 우선순위
- **Additive 또는 Masked**를 우선 검토하고, 큰 Translucent Sprite는 줄입니다.
- **Channel Packed Masks**로 R/G/B/A에 마스크를 나눠 담아 Texture Sample 수를 줄입니다.
- **Refraction, SceneDepth, 복잡한 Noise**는 기기별 비용 차이가 큽니다. 꼭 필요한 컷신/보스 연출에만 제한하세요.
- **Depth Fade**는 유용하지만 남발하면 비용이 누적됩니다. 큰 안개보다 가장자리 문제를 해결하는 용도로 쓰세요.

#### 관련 메뉴
- **Material Technique Library > Mobile Additive Sprite**
- **Material Technique Library > Channel Packed Masks**
- **Material Technique Library > Depth Fade Soft Edge**
- **Production Guide > 성능 최적화 & 프로파일링**`,

            menuHelp: this.buildMenuHelpAnswer(cleaned),

            troubleshooting: `### 증상 기반 트러블슈팅 답변
질문은 “왜 안 보이거나 이상하게 보이는가” 쪽으로 해석됩니다. 아래 순서로 확인하면 원인 분리가 빠릅니다.

#### 1. Niagara 자체가 재생되는지
- System/Component가 Active인지 확인합니다.
- Lifetime이 너무 짧거나 Spawn Count가 0인지 확인합니다.
- 레벨 배치 후 Play/Simulate에서도 보이는지 확인합니다.

#### 2. Bounds 문제인지
- 에디터 미리보기에서는 보이는데 레벨/카메라에서 사라지면 **Fixed Bounds**가 작을 가능성이 큽니다.
- 움직이는 Actor에 붙인 이펙트라면 Local Space와 Bounds를 같이 확인하세요.

#### 3. Material 문제인지
- Alpha가 0이거나 Particle Color Alpha가 죽어 있을 수 있습니다.
- Translucent/Masked/Additive Blend Mode가 의도와 맞는지 확인합니다.
- 검게 보이면 Emissive, Shading Model, Texture Sample Sampler Type을 확인하세요.

#### 관련 메뉴
- **Production Guide > 입문 로드맵 & 첫 이펙트**: “안 보임” 빠른 복구
- **Material Technique Library > Particle Color Bind**
- **Material Technique Library > Depth Fade Soft Edge**
- **Production Guide > 성능 최적화 & 프로파일링**`,

            optimization: `### VFX 최적화 기준 답변
최적화 질문은 항상 **렌더 비용**, **시뮬레이션 비용**, **스폰/메모리 비용**으로 나눠 봐야 합니다.

#### 렌더 비용
- 반투명 Sprite가 화면을 크게 덮으면 Overdraw가 급증합니다.
- Shader Complexity 뷰에서 흰색에 가까우면 크기/알파 영역/파티클 수를 줄이세요.
- Light Renderer, Refraction, SceneDepth는 고비용 후보입니다.

#### 시뮬레이션 비용
- Collision, Event Handler, Curl Noise, Mesh Sampling은 파티클 수가 늘수록 부담이 큽니다.
- GPU Sim은 만능이 아니라 Bounds, 플랫폼 지원, 읽기/이벤트 제약을 함께 봐야 합니다.

#### 스폰/메모리 비용
- 반복 생성 이펙트는 Pooling을 켭니다.
- 먼 거리 LOD에서는 Spawn Rate와 Renderer를 줄이거나 끕니다.

#### 관련 메뉴
- **Production Guide > 성능 최적화 & 프로파일링**
- **Material Technique Library > Mobile Additive Sprite**
- **Material Technique Library > Channel Packed Masks**
- **Niagara System Planner**`,

            niagara: `### Niagara 질문 답변
Niagara 질문은 먼저 **System / Emitter / Particle Spawn / Particle Update / Renderer** 중 어디를 다루는지 나누면 답이 선명해집니다.

#### 판단 기준
- “처음 생길 때 값”이면 **Particle Spawn**입니다. Initialize Particle, Add Velocity, Spawn Location이 여기에 들어갑니다.
- “살아있는 동안 계속 변하는 값”이면 **Particle Update**입니다. Drag, Gravity, Curl Noise, Scale Color가 여기에 들어갑니다.
- “어떻게 그릴지”는 **Renderer**입니다. Sprite, Ribbon, Mesh, Light Renderer를 선택합니다.
- “Actor나 게임플레이에서 값 전달”은 **User Parameter / Blueprint Binding** 영역입니다.

#### 관련 메뉴
- **Production Guide > Niagara 모듈 레퍼런스**
- **Niagara System Planner**
- **Material Technique Library > Particle Color Bind**`,

            material: `### Material Graph 질문 답변
Material 질문은 먼저 출력 목표를 정하세요. VFX에서는 대개 **Emissive**, **Opacity/Opacity Mask**, **Normal**, **Refraction**, **World Position Offset** 중 하나입니다.

#### 출력별 추천
- 흐르는 에너지: **Panner + Texture Sample + Multiply Emissive**
- 외곽 발광: **Fresnel Rim Light**
- 부드러운 지형 경계: **Depth Fade Soft Edge**
- 저비용 모바일: **Mobile Additive Sprite / Channel Packed Masks**
- 소멸/생성: **Alpha Erosion**
- 연기/폭발 시트: **SubUV Flipbook**

#### 관련 메뉴
- **Material Technique Library**에서 위 기술명을 검색하세요.
- 제작 레시피가 필요하면 **Effect Technique Reference > Dissolve & Fade / Elemental VFX**를 확인하세요.`,

            unityMigration: `### Unity → Unreal 전환 기준 답변
Unity Shuriken 용어로 질문했다면 언리얼에서는 Niagara Stack 단계로 번역해야 합니다.

#### 빠른 번역
- Particle System → Niagara System / Emitter
- Start Lifetime → Initialize Particle > Lifetime
- Start Size → Initialize Particle > Sprite Size
- Start Color → Initialize Particle > Color
- Emission Rate → Spawn Rate
- Burst → Spawn Burst Instantaneous
- Color over Lifetime → Scale Color
- Size over Lifetime → Scale Sprite Size
- Renderer → Sprite/Ribbon/Mesh Renderer
- Prefab에 붙이기 → Blueprint Actor + Niagara Component

#### 관련 메뉴
- **Production Guide > Unity → Unreal 마이그레이션**
- **Production Guide > 입문 로드맵**
- **Niagara System Planner**`,

            technique: `### 제작 기법 레퍼런스 안내
질문은 특정 이펙트 제작 기법으로 해석됩니다. 데칼/디졸브/원소별 제작법은 메인 가이드가 아니라 별도 레퍼런스 탭에서 보는 것이 좋습니다.

#### 관련 메뉴
- **Effect Technique Reference > Decal Projection**: 데칼, 탄흔, 마법진, DBuffer
- **Effect Technique Reference > Dissolve & Fade**: 소멸, 생성, 노이즈 마스크, Dynamic Parameter
- **Effect Technique Reference > Elemental VFX**: 화염, 물, 번개, 바람, 얼음
- **Material Technique Library**: 실제 노드 패턴 검색`
        };

        const answer = answers[intent] || this.buildOpenEndedAnswer(originalQuery, cleaned);
        return `${answer}\n\n${this.getOfficialDocsBlock(intent, cleaned)}`;
    }

    getOfficialDocsBlock(intent, cleaned) {
        const docGroups = new Set();
        if (['actorBlueprint', 'menuHelp', 'unityMigration'].includes(intent) || this.hasAny(cleaned, ['actor', '액터', 'blueprint', '블루프린트', 'component', '컴포넌트'])) {
            docGroups.add('actor');
        }
        if (['mobileNiagara', 'niagara', 'optimization'].includes(intent) || this.hasAny(cleaned, ['나이아', 'niagara', 'emitter', '이미터', '파티클'])) {
            docGroups.add('niagara');
        }
        if (['mobileMaterial', 'material', 'optimization', 'technique'].includes(intent) || this.hasAny(cleaned, ['material', '머터리얼', 'shader', '셰이더', '노드'])) {
            docGroups.add('material');
        }
        if (['materialEditor', 'officialDocsDeepDive'].includes(intent) || this.hasAny(cleaned, ['material editor', 'material properties', 'material instance', 'material function', '머터리얼 에디터'])) {
            docGroups.add('material');
        }
        if (['contentWorkflow', 'officialDocsDeepDive'].includes(intent) || this.hasAny(cleaned, ['content browser', 'content drawer', 'asset', 'migrate', 'redirector', '콘텐츠', '에셋'])) {
            docGroups.add('content');
        }
        if (['postProcess', 'officialDocsDeepDive'].includes(intent) || this.hasAny(cleaned, ['post process', 'postprocess', 'bloom', 'exposure', 'color grading', 'custom depth', 'stencil', '포스트프로세스'])) {
            docGroups.add('postprocess');
        }
        if (['mobileNiagara', 'mobileMaterial', 'optimization'].includes(intent) || this.hasAny(cleaned, ['모바일', '최적화', '성능', 'overdraw', '오버드로'])) {
            docGroups.add('optimization');
        }
        if (!docGroups.size) {
            docGroups.add('niagara');
            docGroups.add('material');
        }

        const links = [];
        docGroups.forEach(group => {
            (this.officialDocs[group] || []).forEach(([label, url]) => {
                if (!links.some(item => item[1] === url)) links.push([label, url]);
            });
        });

        return `#### 공식 Unreal Engine 매뉴얼
${links.slice(0, 6).map(([label, url]) => `- [${label}](${url})`).join('\n')}`;
    }

    buildMenuHelpAnswer(cleaned) {
        const rows = [
            ['actor', '액터', 'Production Guide > 입문 로드맵', 'Actor, Component, Blueprint 기본 관계를 먼저 확인하세요.'],
            ['blueprint', '블루프린트', 'Production Guide > 입문 로드맵', 'Niagara Component를 Blueprint Actor에 붙이는 흐름과 연결됩니다.'],
            ['niagara', '나이아가라', 'Production Guide > Niagara 모듈 레퍼런스 / Niagara System Planner', 'Stack 구조를 보려면 레퍼런스, 구성안을 만들려면 Planner가 맞습니다.'],
            ['material', '머터리얼', 'Material Technique Library', '노드 패턴, 모바일/콘솔 기술, 그래프 구성을 검색하세요.'],
            ['decal', '데칼', 'Effect Technique Reference > Decal Projection', 'DBuffer, 투사, 탄흔, 마법진 제작법은 이쪽입니다.'],
            ['dissolve', '디졸브', 'Effect Technique Reference > Dissolve & Fade', '노이즈 침식, 생성/소멸, Dynamic Parameter를 봅니다.'],
            ['mobile', '모바일', 'Production Guide > 성능 최적화 & 프로파일링', 'Overdraw, Pooling, LOD, 저비용 Material 패턴을 확인하세요.'],
            ['unity', '유니티', 'Production Guide > Unity → Unreal 마이그레이션', 'Shuriken 용어를 Niagara 용어로 번역합니다.']
        ];

        const hits = rows.filter(([en, ko]) => cleaned.includes(en) || cleaned.includes(ko));
        const list = (hits.length ? hits : rows).slice(0, 4).map(([, ko, menu, note]) => `- **${ko}**: ${menu} - ${note}`).join('\n');

        return `### 메뉴/항목 위치 안내
질문에서 찾으려는 단어를 기준으로 관련 메뉴를 추론했습니다.

${list}

검색창에서 같은 단어를 입력하면 관련 탭으로 이동하거나 해당 레퍼런스 항목을 찾을 수 있습니다.`;
    }

    buildReferenceAnswer(query, chapter) {
        return `### Reference Match: ${chapter.title}
질문 **"${query}"**은(는) Production Guide의 **${chapter.title}** 항목과 관련이 높습니다.

#### 먼저 볼 부분
- 개념 설명이 필요하면 해당 챕터 본문을 확인하세요.
- 실제 제작 레시피가 필요하면 **Effect Technique Reference**를 확인하세요.
- 노드 구조가 필요하면 **Material Technique Library**에서 관련 노드명을 검색하세요.

#### 질문을 더 구체화하는 방법
- “어디서 설정해?”라고 물으면 메뉴 위치 중심으로 답변합니다.
- “왜 안 보여?”라고 물으면 트러블슈팅 순서로 답변합니다.
- “모바일에서 가능해?”라고 물으면 플랫폼 비용 기준으로 답변합니다.

${this.getOfficialDocsBlock('menuHelp', query.toLowerCase())}`;
    }

    buildOpenEndedAnswer(query, cleaned) {
        const likelyMenu = this.buildMenuHelpAnswer(cleaned);
        return `### VFX Technical Direction: "${query}"
질문이 특정 챕터 하나로 딱 고정되지는 않지만, 실무적으로는 아래 순서로 접근하는 것이 좋습니다.

#### 1. 먼저 대상 분류
- 게임 오브젝트/배치 문제면 **Actor / Blueprint / Niagara Component** 문제입니다.
- 움직임과 생성 규칙이면 **Niagara System / Emitter / Spawn / Update** 문제입니다.
- 색, 투명도, 굴절, 발광이면 **Material Graph** 문제입니다.
- 프레임 하락이면 **Overdraw / Spawn Count / Shader Cost / Pooling** 문제입니다.

#### 2. 다음 질문으로 좁히기
- “이걸 Actor에 붙이는 방법”
- “모바일에서 이 Niagara 구성이 안전한지”
- “Material에서 어떤 노드 패턴을 써야 하는지”
- “안 보이는 원인을 어디서 확인할지”

${likelyMenu}`;
    }

    generateCustomVfxRecipe(promptText) {
        const cleaned = promptText.trim().toLowerCase();
        
        if (!cleaned) {
            return {
                num: "ERROR",
                title: "입력된 설계 컨셉이 없습니다",
                subtitle: "VFX 맞춤형 AI 설계 요청에 상세한 아이디어를 입력하세요.",
                content: `### ⚠️ 설계 입력이 유효하지 않습니다.

왼쪽 하단의 **VFX 맞춤형 AI 설계 요청** 입력란에 구현하고 싶은 이펙트의 비주얼 컨셉이나 요구사항을 입력한 후, 버튼을 클릭해 주세요.

**예시 컨셉:**
- 캐릭터 주변에서 회전하며 솟구치는 카툰풍 화염 폭파 이펙트
- 칼을 휘두를 때 공간이 투명하게 왜곡되며 찢어지는 충격파 쇼크웨이브
- 지면과 수면에 부딪혀 하얀 거품을 일으키는 AAA급 물보라 파도`
            };
        }

        // 1. Identify visual style and platform tier from active settings to make it highly coherent
        const styleText = this.selectedStyle === 'stylized' ? "스타일라이즈드(Stylized 카툰풍)" : "리얼리스틱(Realistic 실사풍)";
        const tierText = this.selectedTier === 'aaa' ? "AAA 고해상도 콘솔/PC용" : "캐주얼 모바일/저사양 플랫폼용";

        // 2. Perform Keyword extraction and dynamic analysis
        let visualKeywords = [];
        let recommendedNodes = [];
        let materialDomain = "Surface";
        let blendMode = "Translucent";
        let shadingModel = "Unlit";
        let decalSettings = "";
        let virtualDepthExplanation = "";
        let animationExplanation = "";
        let emissiveExplanation = "";
        let niagaraEmitterType = "GPU Compute Sim";
        let niagaraRenderer = "Sprite Renderer";
        let niagaraSpawnType = "Spawn Burst Instantaneous";
        let niagaraParamsTable = [];

        // Dynamic concept classification
        let matchedConcept = "사용자 지정 커스텀 이펙트";
        
        if (cleaned.includes('용암') || cleaned.includes('마그마') || cleaned.includes('lava') || cleaned.includes('crack') || cleaned.includes('갈라')) {
            matchedConcept = "실시간 3D 가상 뎁스 용암 균열 데칼 (Lava Crack Depth Decal)";
            visualKeywords.push("고열의 마그마 유체 흐름", "크랙 지형 균열 발광", "서서히 식어 부스러지는 재(Ash)");
            recommendedNodes.push("Bump Offset (가상 뎁스)", "Panner (용암 흐름 스크롤)", "SmoothStep (디졸브)", "Sphere Mask (생성)");
            materialDomain = "Deferred Decal";
            blendMode = "Translucent";
            shadingModel = "Unlit";
            
            decalSettings = `
> [!IMPORTANT]
> **DBuffer Decal 실무 필수 세팅 (UE5 마스터 TA 핵심)**
> 데칼이 지면의 그림자 및 루멘(Lumen) 라이팅과 자연스럽게 포개지기 위해, 머터리얼 세팅에서 **Material Domain: Deferred Decal**, **Blend Mode: Translucent**, **Decal Blend Mode: DBuffer Translucent Color Normal Roughness**를 필수로 선택해야 합니다. 이렇게 해야 가상 섀도 맵(VSM) 환경에서 데칼이 공중에 떠 보이지 않고 완벽히 밀착됩니다.`;

            virtualDepthExplanation = `
#### 🌌 3D 가상 뎁스 (Virtual Depth) 구현 수식
균열 내부가 실제 땅속 깊이 아래로 깊숙이 파여 보이는 입체감을 위해 **Bump Offset** 노드를 탑재합니다.
1. **Bump Offset 노드 배치**:
   - 'Height Map' 텍스처를 셰이더에 배치하고 R 채널(높이 맵: 균열 부분이 0, 지면 부분이 1)을 추출합니다.
   - **Bump Offset** 노드를 추가하고, 'Height' 입력 핀에 높이 맵의 R 채널을 직결합니다.
   - 'Height Ratio (Depth)' 파라미터를 생성하여 **Scalar Parameter ('Lava_Depth': 추천값 0.05)**로 노출해 뎁스 깊이감을 제어하도록 구성합니다.
   - 'Reference Plane'은 '1.0'으로 설정하여 균열이 지면보다 **아래로** 깊숙이 들어가 보이도록 유도합니다.
   - Bump Offset의 'UVs' 출력 핀을 모든 Base Color, Emissive 마스크, Normal 텍스처 샘플러의 'UVs' 입력 핀에 직결시킵니다.`;

            animationExplanation = `
#### 🎭 생성/소멸 애니메이션 회로 구성 (Sphere Mask & Step Dissolve)
1. **원형 생성 (Sphere Mask)**:
   - **Texture Coordinate (0번)** -> **Subtract 0.5** -> **Length** 연산을 거쳐 원형 마스크를 설계합니다.
   - 나이아가라 Dynamic Parameter 1번 채널에서 제어되는 **Scalar Parameter ('Grow_Radius': 0~1)**와 **Sphere Mask** 노드를 엮어 중심에서 외곽으로 균열이 쫙 확장되어 등장하도록 세팅합니다.
2. **절차적 디졸브 소멸**:
   - **3D Noise** 혹은 노이즈 텍스처를 배치합니다.
   - 나이아가라 Dynamic Parameter 2번 채널에서 제어되는 **Scalar Parameter ('Dissolve_Amount': 0~1)**와 **SmoothStep** 노드를 엮습니다.
   - 'SmoothStep (Min: Dissolve_Amount, Max: Dissolve_Amount + 0.15, Value: Noise)' 연산을 거쳐 Opacity Mask를 구성해 자연스러운 소멸을 유도합니다.`;

            emissiveExplanation = "용암의 타오르는 에너지를 표현하기 위해, 용암 마스크 흐름 구역에 **Particle Color (RGB)**를 곱하고 강력한 발광 상수를 Multiply합니다. **Power** 노드의 Exp 핀에 **Scalar Parameter ('Lava_Emissive_Power': 기본값 35.0)**를 엮어 용암 줄기를 네온 글로우로 번쩍이게 주입합니다.";
            niagaraRenderer = "Decal Renderer (용암 데칼 투사)";
        } 
        else if (cleaned.includes('폭파') || cleaned.includes('폭발') || cleaned.includes('화염') || cleaned.includes('불') || cleaned.includes('explosion') || cleaned.includes('fire')) {
            matchedConcept = "AAA급 화염 폭발 이펙트 (Thermal Fire Explosion)";
            visualKeywords.push("초기 가스 팽창 압력", "고열의 화염 구름 글로우", "불티 파편(Embers) 비산");
            recommendedNodes.push("SubUV Texture Sample (화염 시퀀스)", "Depth Fade (교차 소프트화)", "Particle Color (수명 동기화)");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";
            
            animationExplanation = `
#### 🎭 수명 기반 SubUV 프레임 동기화 회로
1. **스프라이트 시퀀스 재생**:
   - 나이아가라의 SubUV 애니메이션 모듈과 동기화되도록 머터리얼 내에 **Texture Sample** 노드를 SubUV 모드로 구성합니다.
   - **Depth Fade** 노드를 최종 투명도에 곱하여 지면이나 벽면에 화염 파티클이 포개질 때 칼선이 생기지 않도록 감쇄합니다.`;

            emissiveExplanation = "화염 구역의 극단적 고열 묘사를 위해 **Particle Color (RGB)**에 강력한 **Scalar Parameter ('Fire_Emissive_Boost': 추천값 50.0)**를 곱하고, 입자 중심부 핫스팟에 **Power** 연산을 가해 강력한 눈부심을 연출합니다.";
            niagaraEmitterType = "GPU Compute Sim";
            niagaraSpawnType = "Spawn Burst Instantaneous (150~300개)";
            niagaraRenderer = "Sprite Renderer (Facing: Camera)";
        }
        else if (cleaned.includes('쇼크웨이브') || cleaned.includes('충격파') || cleaned.includes('shockwave') || cleaned.includes('왜곡') || cleaned.includes('굴절') || cleaned.includes('distortion') || cleaned.includes('refraction')) {
            matchedConcept = "공기 압축 쇼크웨이브 & 굴절 왜곡 (Refraction Shockwave)";
            visualKeywords.push("초고속 파형의 굴절 왜곡", "배경 공간의 뒤틀림", "선명한 고리 테두리 에너지");
            recommendedNodes.push("Refraction (굴절 왜곡 핀)", "Normal (왜곡 굴절 벡터)", "Radial Gradient Exponential (원형 펄스)", "One Minus");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";

            virtualDepthExplanation = `
#### 🌀 공간 뒤틀림(Screen Distortion) 구현 수식
공기가 찢어지며 렌즈 왜곡이 발생하는 시각 효과를 위해 **Refraction (굴절)** 핀을 직접 자극합니다.
1. **굴절 왜곡 회로**:
   - 원형 고리 마스크를 추출한 뒤 **Normal Map** 스크롤러와 곱합니다.
   - 이 노멀 벡터 값에 왜곡 감쇄 강도 조율을 위한 **Scalar Parameter ('Distortion_Strength': 추천값 0.08)**를 곱해 준 후 머터리얼의 **Refraction** 핀에 주입합니다.
   - 렌더 세팅에서 **Lighting Mode**를 **Surface Translucency Volume** 또는 **Refraction** 활성화 모드로 전환합니다.`;

            animationExplanation = `
#### 🎭 팽창 및 감쇄 애니메이션 회로 (Ring Expand)
1. **나선을 따라 뻗어나가는 고리**:
   - **Radial Gradient Exponential** 노드를 배치해 선명한 원형 링을 설계합니다.
   - 나이아가라 Dynamic Parameter 1번 채널에서 전달받는 커브 수치로 고리의 반경(Radius)을 초고속 팽창시키고, 수명이 다할 무렵 왜곡 강도가 '0.0'으로 수렴하게 감쇄시킵니다.`;

            emissiveExplanation = "왜곡 테두리 부분에 미세한 시안 블루 혹은 형광 보라의 에너지를 덧대기 위해, 고리 가장자리 마스크에 **Particle Color (RGB) * 15.0**을 곱해 Emissive Color 핀에 가해 줍니다.";
            niagaraSpawnType = "Spawn Burst Instantaneous (1~3개 단발 스폰)";
        }
        else if (cleaned.includes('파도') || cleaned.includes('물보라') || cleaned.includes('물') || cleaned.includes('wave') || cleaned.includes('water') || cleaned.includes('바다')) {
            matchedConcept = "지면 충돌 유체 파도 & 물방울 (Fluid Ripple & Splash)";
            visualKeywords.push("수면 경계선의 하얀 거품(Foam)", "투명한 유리빛 굴절", "사방으로 튀는 물방울 파편");
            recommendedNodes.push("Depth Fade (거품 경계선 추출)", "Panner (물결 패닝)", "Refraction (수면 굴절)", "Roughness (0.02로 극단적 광택)");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Default Lit (루멘 및 태양 반사광 확보)";

            animationExplanation = `
#### 🎭 경계 거품 및 충돌 감쇄 회로
1. **Depth Fade를 활용한 수면 Foam 추출**:
   - 반투명 물 머터리얼이 바위나 해안 지면과 충돌하는 지점을 감지하기 위해 **Depth Fade** 노드를 활용합니다.
   - 거품의 두께를 제어할 **Scalar Parameter ('Foam_Distance': 추천값 40.0)**를 연결하고, 0과 1 사이로 뒤집은 감쇄 구역에 흰 거품 텍스처를 **Lerp**로 혼합해 자연스럽게 바스러지는 거품을 표현합니다.`;

            emissiveExplanation = "물 자체는 빛을 내지 않으므로 이미시브는 0으로 유지하되, 태양광이 강하게 역광으로 투과할 때 빛나는 현상을 묘사하기 위해 **Fresnel** 노드를 엮어 물방울 외곽 테두리에 아주 은은하게 맑은 광채(RGB * 2.0)를 Emissive에 엮어줍니다. 또한 물결 질감을 위해 **Roughness: 0.02**, **Specular: 0.9**를 부여합니다.";
            niagaraSpawnType = "Spawn Burst + Spawn Rate 복합 스폰";
            niagaraRenderer = "Sprite Renderer + Mesh Renderer (물방울 파편 메시 혼합)";
        }
        else if (cleaned.includes('피') || cleaned.includes('blood') || cleaned.includes('출혈') || cleaned.includes('혈액')) {
            matchedConcept = "점성 선혈 피격 이펙트 (Fluid Viscous Blood)";
            visualKeywords.push("어둡고 끈적이는 검붉은 색채", "젖어서 번들거리는 하이라이트", "바닥에 영구 잔류하는 피웅덩이");
            recommendedNodes.push("Roughness (0.05로 젖은 묘사)", "Specular (0.95로 강한 반사율)", "Panner (피 흐름)", "Opacity Mask");
            materialDomain = "Surface";
            blendMode = "Masked";
            shadingModel = "Default Lit (반사 하이라이트 확보 필수)";

            animationExplanation = `
#### 🎭 점성 액체 팽창 및 파열 회로
1. **끈적이며 튀어나가는 핏방울**:
   - 피의 덩어리감을 극대화하기 위해 불투명 마스크(**Opacity Mask**)에 절차적 대비가 높은 노이즈 텍스처를 주입합니다.
   - **Step** 노드를 활용해 핏방울 덩어리가 고속 비산 시 뭉개지지 않고 동글동글하고 덩어리감 있게 칼같이 잘리도록 형태를 보존합니다.`;

            emissiveExplanation = "피는 자체 발광이 0에 수렴해야 사실적입니다. 따라서 Emissive Color는 연결하지 않고, 대신 **Roughness를 0.05 이하**로 떨어뜨리고 **Specular를 0.9 이상**으로 팽팽하게 잡아주어 빛을 받았을 때 점성 액체 특유의 어둡고 번들거리는 반사광 하이라이트가 또렷이 맺히도록 세팅합니다.";
            niagaraSpawnType = "Spawn Burst Instantaneous (피격 순간 터짐)";
            niagaraRenderer = "Sprite Renderer (피안개) + Mesh Renderer (핏방울 파편)";
        }
        else if (cleaned.includes('흡혈') || cleaned.includes('피흡') || cleaned.includes('lifesteal') || cleaned.includes('힐') || cleaned.includes('heal')) {
            matchedConcept = "생명 에너지 흡혈 트레일 (Lifesteal Energy Drain)";
            visualKeywords.push("타깃에서 흡수되어 날아오는 궤적", "붉은 나선형 스플라인 에너지", "시전자에게 도달 시 폭발하는 치유 빛");
            recommendedNodes.push("Ribbon UV (U축 One Minus 꼬리 감쇄)", "Panner (에너지 유입 스크롤)", "Sine (전기 펄스 맥박)", "Fresnel");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";

            animationExplanation = `
#### 🎭 꼬리가 가늘어지는 고속 유입 리본 회로
1. **궤적 꼬리 감쇄 (One Minus Tail)**:
   - Ribbon Renderer를 거쳐 날아오는 에너지가 꼬리로 갈수록 흐려지도록 **TexCoord.U**를 **One Minus** 하여 감쇄 마스크로 활용합니다.
   - **Panner (Speed X: -3.0)**를 노이즈 텍스처에 엮어, 타깃에서 시전자를 향해 에너지가 맹렬히 빨려 드는 고속 흐름 흐름을 줍니다.`;

            emissiveExplanation = "에너지가 흐르는 줄기가 타오르도록 **Particle Color (RGB)**를 곱하고 **Scalar Parameter ('Heal_Emissive_Boost': 추천값 45.0)**를 적용하여 밤낮 레벨 어디서든 또렷하고 강력한 네온 에너지를 발산하도록 주입합니다.";
            niagaraRenderer = "Ribbon Renderer (궤적 리본 추적)";
            niagaraSpawnType = "Spawn Rate (초당 60개 연속 스폰)";
        }
        else if (cleaned.includes('번개') || cleaned.includes('전기') || cleaned.includes('lightning') || cleaned.includes('스파크') || cleaned.includes('spark')) {
            matchedConcept = "절차적 Jitter 번개 & 스파크 (Jitter Lightning & Spark)";
            visualKeywords.push("난수 좌표로 지그재그 꺾이는 궤적", "눈부신 초고속 Flicker 깜빡임", "고열의 형광 네온 컬러");
            recommendedNodes.push("Sine (Flicker 파형)", "Time", "Panner", "Absolute World Position");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";

            animationExplanation = `
#### 🎭 눈부신 Flicker 깜빡임 회로
1. **초고속 전기 Flicker**:
   - 전기가 매 프레임 다르게 진동하며 깜빡이도록 **Time** 노드에 상수 **180.0**을 곱하고 **Sine** 노드를 거치게 해 고속 맥박 파형을 만듭니다.
   - 이 파형을 오파시티와 이미시브 연산의 끝단에 곱해('Multiply'), 번개가 내려치는 0.1초 동안 미친 듯이 전율하며 깜빡이게 설계합니다.`;

            emissiveExplanation = "전기는 셰이더 내에서 가장 강력한 광원을 방출해야 합니다. **Particle Color (RGB)**에 **Multiply 80.0 ~ 120.0**을 곱해 Emissive 핀에 강제 주입하여, 포스트 프로세스 환경에서 화면을 온통 강타하는 전이 광채를 완성시킵니다.";
            niagaraRenderer = "Ribbon Renderer (Jitter Position 모듈 탑재 필수)";
            niagaraSpawnType = "Spawn Burst (초고속 단발 타격)";
        }
        else if (cleaned.includes('바람') || cleaned.includes('회오리') || cleaned.includes('wind') || cleaned.includes('vortex') || cleaned.includes('태풍') || cleaned.includes('공기')) {
            matchedConcept = "대기 회오리 & 바람 장막 (Vortex Wind & Barrier)";
            visualKeywords.push("나선형 소용돌이 기류 마스크", "공기 밀도차에 의한 미세 굴절 왜곡", "부드러운 연기 리본 가닥");
            recommendedNodes.push("Rotator (회전 UV)", "Texture Coordinate", "One Minus", "Refraction");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";

            animationExplanation = `
#### 🎭 소용돌이 회전 및 외곽선 투명 감쇄 회로
1. **Rotator를 이용한 UV 회전**:
   - 대기가 소용돌이치며 회전하도록 **Texture Coordinate** 노드 뒤에 **Rotator** 노드를 달고 회전 속도를 바인딩합니다.
   - 파티클의 외곽선 테두리가 거칠게 찢어지는 현상을 완화하고 안개처럼 부드럽게 감쇄하기 위해 **Depth Fade**와 **Fresnel** 노드를 혼합 주입합니다.`;

            emissiveExplanation = "바람은 눈에 보이지 않으므로 이미시브 글로우를 과도하게 쓰기보단 투명도 마스킹에 신경 쓰고, 바람 에너지가 담긴 끝단 부분에만 은은한 에메랄드/시안 파스텔 컬러(Multiply 3.0)를 엮어 이미시브에 주입합니다.";
            niagaraRenderer = "Sprite Renderer + Ribbon Renderer";
            niagaraSpawnType = "Spawn Rate (지속형 흐름)";
        }
        else if (cleaned.includes('얼음') || cleaned.includes('빙결') || cleaned.includes('ice') || cleaned.includes('frost')) {
            matchedConcept = "빙결 얼음 결정 & 서리 파편 (Crystal Ice & Frost)";
            visualKeywords.push("단단하고 각진 반투명 결정 부피감", "내부 광원 산란(SSS) 효과", "솟구치는 단단한 얼음 기둥");
            recommendedNodes.push("Fresnel", "Subsurface Scattering", "Roughness (0.1로 단단한 질감)", "Normal Map");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Default Lit (반투명 볼륨 라이팅 확보)";

            animationExplanation = `
#### 🎭 하부 표면 산란 및 Fresnel 반사광 회로
1. **빛이 반사되고 투과하는 얼음 구조**:
   - 얼음의 껍질 부분에서 내부 빛이 산란되어 맺히는 부피 묘사를 위해 셰이딩 모델을 **Subsurface (하부 표면 산란)**로 가동합니다.
   - 캐릭터나 몬스터를 얼릴 때 외곽선이 차갑게 반짝이도록 **Fresnel** 노드를 통과시켜 얼음 결정질 외곽 각진 테두리에 투명 형광 서리를 앉힙니다.`;

            emissiveExplanation = "태양광이나 마법의 빛을 받았을 때 차갑게 푸른빛으로 반짝이도록 **Fresnel 마스크 * Particle Color (RGB) * 5.0**을 이미시브에 장착합니다. 또한 얼음 고유의 단단하고 매끄러운 단면을 위해 **Roughness: 0.1**과 거친 얼음 단면 **Normal Map**을 필수 세팅합니다.";
            niagaraRenderer = "Mesh Renderer (각진 고체 얼음 파편 스폰)";
        }
        else {
            // Smart general generator for arbitrary VFX requests (ChatGPT style fallback)
            // We extract matching concepts dynamically from their string
            const words = promptText.replace(/[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};:\'\",\<\.\>\/\?]/g, ' ')
                                   .split(/\s+/)
                                   .filter(w => w.length >= 2);
            
            matchedConcept = words.length > 0 ? words[0] + " 맞춤형" : "사용자 지정 커스텀";
            visualKeywords.push("시간의 패닝 스크롤 조작");
            visualKeywords.push("수명 주기에 따른 완전 투명 감쇄");
            visualKeywords.push("강렬한 광택 하이라이트");
            recommendedNodes.push("Panner (시간 이동)");
            recommendedNodes.push("Linear Interpolate (Lerp 보간)");
            recommendedNodes.push("Particle Color (나이아가라 데이터 동기화)");
            recommendedNodes.push("Depth Fade (교차 소프트화)");
            materialDomain = "Surface";
            blendMode = "Translucent";
            shadingModel = "Unlit";

            // Add custom elements matching words in prompt
            let customFeatures = [];
            if (cleaned.includes('연기') || cleaned.includes('smoke') || cleaned.includes('가스') || cleaned.includes('gas') || cleaned.includes('안개')) {
                visualKeywords.push("부드러운 대기 가스 볼륨");
                visualKeywords.push("흐릿한 연기 파편");
                recommendedNodes.push("Camera Offset");
                recommendedNodes.push("Soft Particle");
                customFeatures.push("연기 질감을 위한 부드러운 가스 텍스처 패닝");
            }
            if (cleaned.includes('글리치') || cleaned.includes('glitch') || cleaned.includes('sf') || cleaned.includes('사이버')) {
                visualKeywords.push("SF 디지털 글리치 지터");
                visualKeywords.push("색수차 화면 깨짐");
                recommendedNodes.push("Rotator");
                recommendedNodes.push("Sine (노이즈 스케일)");
                recommendedNodes.push("Time");
                customFeatures.push("주기함수를 사용한 픽셀 지터 위치 오프셋 변형");
            }
            if (cleaned.includes('소멸') || cleaned.includes('사라') || cleaned.includes('fade')) {
                customFeatures.push("수명 곡선에 매핑된 서서히 사라지는 불투명도 감쇄");
            }

            let features_str = "";
            customFeatures.forEach((f, i) => {
                features_str += `\\n\${i+2}. **\${f}**: 셰이더 내에서 패너 및 LERP 노드를 활용해 이펙트의 동적 움직임을 제어합니다.`;
            });

            animationExplanation = `
#### 🎭 맞춤형 애니메이션 및 마스크 구성
1. **나이아가라 동기화 회로**:
   - 나이아가라 이미터에서 파티클의 나이(Age)와 수명(Lifetime)에 따라 변형을 주기 위해 **Particle Color** 노드를 배치합니다.
   - 파티클 수명이 끝날 때 뚝 끊기며 사라지는 불량을 해결하기 위해 Alpha 채널을 Opacity 핀에 직결하고 끝단에 **Depth Fade**를 곱하여 지형지물 충돌면을 부드러운 먼지처럼 감쇄 처리합니다.\${features_str}`;

            emissiveExplanation = "이펙트가 화면에서 화려하게 네온 빛을 발산하도록 **Particle Color (RGB)**에 **Scalar Parameter ('VFX_Emissive_Boost': 추천값 30.0)**를 곱하여 Emissive Color 핀에 직결함으로써 완성도 높은 네온 글로우를 확보합니다.";
        }

        // Generate dynamic Niagara parameters table based on matching
        niagaraParamsTable.push({ name: "Initialize Particle", val: "Lifetime: 0.5s ~ 1.5s 무작위 분포, Color: 이펙트 비주얼 기조에 어울리는 HSL 커스텀 컬러 세팅" });
        if (materialDomain === "Deferred Decal") {
            niagaraParamsTable.push({ name: "Decal Renderer", val: "생성한 마스터 가상 뎁스 데칼 머터리얼 인스턴스를 바인딩하고 투사 영역 크기 조율" });
        } else if (niagaraRenderer === "Ribbon Renderer") {
            niagaraParamsTable.push({ name: "Ribbon Renderer", val: "파티클들을 선형 궤적으로 엮어내 검기나 줄기 면을 형성 (Facing: Camera 설정)" });
        } else if (niagaraRenderer === "Mesh Renderer") {
            niagaraParamsTable.push({ name: "Mesh Renderer", val: "3D 스태틱 메쉬를 이미터에서 무더기로 솟구치도록 스폰 (LOD 거리 감쇄 적용)" });
        } else {
            niagaraParamsTable.push({ name: "Sprite Renderer", val: "파티클 2D 이미지를 카메라 정렬(Facing: Camera Query) 상태로 렌더링" });
        }

        if (cleaned.includes('디졸브') || cleaned.includes('소멸') || cleaned.includes('생성') || cleaned.includes('균열') || cleaned.includes('용암')) {
            niagaraParamsTable.push({ name: "Dynamic Parameter (Grow)", val: "Curve 설정 (0.0s -> 0.3s 구간: 0.0에서 1.0으로 가파르게 상승)으로 원형 소생" });
            niagaraParamsTable.push({ name: "Dynamic Parameter (Dissolve)", val: "Curve 설정 (0.8s -> 1.5s 구간: 0.0에서 1.0으로 상승)으로 불완전 소멸" });
        } else {
            niagaraParamsTable.push({ name: "Scale Color / Alpha", val: "Age/Lifetime 수명 0.8 시점부터 알파 값을 1.0에서 0.0으로 서서히 떨어뜨리는 부드러운 소멸 커브 곡선 설계" });
        }

        // Build final ChatGPT structured report
        let contentMarkdown = `### 📖 맞춤형 AI 설계: \${matchedConcept} 이펙트 블루프린트
*사용자가 입력하신 이펙트 세부 요건을 실시간 분석하여 완벽 조립된 **언리얼 엔진 5.4+ 테크니컬 아티스트(TA) 마스터 설계 도면**입니다.*

---

### 1. 🧊 1단계: 마스터 머터리얼 노드 아키텍처 (Material Graph)

이펙트의 비주얼 컨셉 **[\${visualKeywords.join(', ')}]**을 오버드로 렉 없이 최상급 AAA 비주얼로 구현하기 위한 셰이더 설정 및 핵심 노드 설계도입니다.
\${decalSettings}

#### A. 머터리얼 기본 프로필 세팅
- **Material Domain**: \${materialDomain}
- **Blend Mode**: \${blendMode}
- **Shading Model**: \${shadingModel}
- **Two Sided (양면 렌더링)**: \${materialDomain === "Surface" ? "True (체크 필수 - 펄럭이거나 휘어질 때 뒷면 뚫림 방지)" : "N/A (데칼의 경우 해당 무)"}
\${virtualDepthExplanation}
\${animationExplanation}

#### B. 이미시브 및 글로우 제어 회로 (Emissive Formula)
\${emissiveExplanation}
1. **최종 Emissive 핀 주입 공식**:
   - '[최종 이펙트 마스크 (UV 스크롤 & 애니메이션 팽창)] * Particle Color (RGB) * Emissive Power'
   - 이미시브 세기가 강렬해질 때 생기는 네온 글로우는 레벨 내 포스트 프로세스 볼륨의 **Bloom** 세팅값과 실시간 상호작용하여 화면 가득 화려하게 퍼져나갑니다.

---

### 2. 🌀 2단계: 나이아가라(Niagara) 시스템 설계 및 이미터 제어표

파티클을 방출하고, 머터리얼의 물리 특성을 실시간으로 100% 가속하기 위해 이미터 내에 배치해야 할 모듈 및 추천 수치 조합입니다.

| 나이아가라 이미터 항목 | 추천 세팅값 및 파라미터 제어 공식 | 실무 꿀팁 및 가속 효과 |
| :--- | :--- | :--- |
| **Sim Target (연산 타깃)** | **\${niagaraEmitterType}** | 대량 스폰 시에도 프레임 드랍(Spike)을 미연에 방지 |
| **Spawn 모듈** | **\${niagaraSpawnType}** | 컨셉에 최적화된 프레임 단위 파티클 스폰 흐름 |
\${niagaraParamsTable.map(row => '| **\${row.name}** | \${row.val} | 머터리얼 변형 제어에 기여 |').join('\n')}

---

### 3. 🚀 3단계: 상용 배포용 최적화 가이드라인 (Optimization & LOD)

1. **SubUV Cutout (오버드로 차단)**:
   - 만약 투명 영역이 많이 포함된 불꽃이나 안개 스프라이트를 겹쳐 쏠 경우, 나이아가라 스프라이트 렌더러 내의 **SubUV Cutout** 기능을 켜서 버텍스를 타이트하게 깎아내십시오. 겹친 부위의 Shader Complexity 픽셀 부하가 기하급수적으로 낮아집니다.
2. **System Pooling 활성화 (메모리 파편화 방지)**:
   - 본 이펙트는 게임 중 자주 스폰될 가능성이 높으므로, 나이아가라 시스템 세팅에서 **System Pooling -> Enabled**로 바인딩하고, 블루프린트에서 Auto Release로 생성해 CPU 인스턴스 해제 렉을 원천 예방하십시오.
3. **LOD 거리 컬링**:
   - 플레이어와의 거리 **Distance > 5000** 이상일 경우 이미터를 완전 비활성화하거나 스폰 비율을 90% 이상 차단하도록 이미터 LOD 곡선을 연동해 그래픽 메모리를 절대적으로 사수하십시오.`;

        return {
            num: "CUSTOM",
            title: `맞춤 AI 설계: \${promptText.substring(0, 24).replace(/\n/g, ' ')}\${promptText.length > 24 ? '...' : ''}`,
            subtitle: '\${styleText} / \${tierText} 환경을 위한 맞춤형 VFX 테크니컬 마스터 리포트',
            content: contentMarkdown
        };
    }
}
