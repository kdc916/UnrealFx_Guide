/* js/material-lab.js - Unreal Material Node Graph & Copy-Paste Clipboard Generator */

class MaterialLab {
    constructor() {
        this.currentPreset = 'glow';
        
        // Unreal Engine actual copyable text strings (Clipboard format)
        this.unrealCopyTexts = {
            glow: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_1"
    CommentWidth=680
    CommentHeight=450
    NodeColor=(R=1.000000,G=0.550000,B=0.000000,A=1.000000)
    NodeComment="[UnrealFX AI] Glowing Emissive Panner Master Shading"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_0"
    UTiling=1.000000
    VTiling=1.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTime Name="MaterialExpressionTime_0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_0"')
    Time=(Expression=MaterialExpressionTime'"MaterialExpressionTime_0"')
    SpeedX=0.000000
    SpeedY=-0.500000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_0"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_0"')
    SamplerType=SAMPLERTYPE_LinearColor
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_0"
    R=50.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_0"
    A=(Expression=MaterialExpressionTextureSample'"MaterialExpressionTextureSample_0"',OutputIndex=1)
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_0"')
End Object`,

            emissive: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Em"
    CommentWidth=620
    CommentHeight=380
    NodeColor=(R=1.000000,G=0.850000,B=0.000000,A=1.000000)
    NodeComment="[UnrealFX AI] High-Emissive Color Boost Master Setup"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant3Vector Name="MaterialExpressionConstant3Vector_Em0"
    Constant=(R=1.000000,G=0.350000,B=0.000000,A=1.000000)
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_Em1"
    R=80.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_Em0"
    A=(Expression=MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_Em0"')
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_Em1"')
End Object`,

            slashribbon: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Sl"
    CommentWidth=680
    CommentHeight=450
    NodeColor=(R=0.000000,G=0.800000,B=1.000000,A=1.000000)
    NodeComment="[UnrealFX AI] Velocity Aligned Slash Ribbon V-Mask"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Sl0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionComponentMask Name="MaterialExpressionComponentMask_Sl0"
    Input=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Sl0"')
    G=True
End Object
Begin Object Class=/Script/Engine.MaterialExpressionSine Name="MaterialExpressionSine_Sl0"
    Input=(Expression=MaterialExpressionComponentMask'"MaterialExpressionComponentMask_Sl0"')
    Period=1.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionParticleColor Name="MaterialExpressionParticleColor_Sl0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_Sl0"
    A=(Expression=MaterialExpressionSine'"MaterialExpressionSine_Sl0"')
    B=(Expression=MaterialExpressionParticleColor'"MaterialExpressionParticleColor_Sl0"')
End Object`,
            
            decal: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_2"
    CommentWidth=720
    CommentHeight=480
    NodeColor=(R=0.000000,G=0.900000,B=0.500000,A=1.000000)
    NodeComment="[UnrealFX AI] DBuffer Decal Normal & Glowing Emissive Map Setup"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_1"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_1"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_1"')
    SpeedY=-0.200000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_1"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_1"')
    SamplerType=SAMPLERTYPE_Normal
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant3Vector Name="MaterialExpressionConstant3Vector_0"
    Constant=(R=0.000000,G=0.940000,B=1.000000,A=1.000000)
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_2"
    R=35.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_1"
    A=(Expression=MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_0"')
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_2"')
End Object`,
            
            parallax: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Pa"
    CommentWidth=740
    CommentHeight=480
    NodeColor=(R=0.700000,G=0.000000,B=1.000000,A=1.000000)
    NodeComment="[UnrealFX AI] 3D Crystal Parallax Occlusion Offset Setup"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionCameraVector Name="MaterialExpressionCameraVector_Pa0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Pa0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionBumpOffset Name="MaterialExpressionBumpOffset_Pa0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Pa0"')
    HeightRatio=0.050000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_Pa0"
    Coordinate=(Expression=MaterialExpressionBumpOffset'"MaterialExpressionBumpOffset_Pa0"')
End Object`,

            distortion: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Di"
    CommentWidth=700
    CommentHeight=420
    NodeColor=(R=0.000000,G=0.850000,B=0.850000,A=1.000000)
    NodeComment="[UnrealFX AI] Fire Hot Air / Shockwave Screen Refraction Distortion"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Di0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_Di0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Di0"')
    SpeedY=-0.350000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_Di0"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_Di0"')
    SamplerType=SAMPLERTYPE_Normal
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_Di0"
    R=0.060000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_Di0"
    A=(Expression=MaterialExpressionTextureSample'"MaterialExpressionTextureSample_Di0"',OutputIndex=1)
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_Di0"')
End Object`,

            shockwave: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Sh"
    CommentWidth=720
    CommentHeight=460
    NodeColor=(R=1.000000,G=0.300000,B=0.000000,A=1.000000)
    NodeComment="[UnrealFX AI] Kinetic Radial Shockwave Ring Wave Normal"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionRadialGradientExponential Name="MaterialExpressionRadialGradientExponential_Sh0"
    Density=2.500000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionSine Name="MaterialExpressionSine_Sh0"
    Input=(Expression=MaterialExpressionRadialGradientExponential'"MaterialExpressionRadialGradientExponential_Sh0"')
    Period=0.200000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_Sh0"
    R=15.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_Sh0"
    A=(Expression=MaterialExpressionSine'"MaterialExpressionSine_Sh0"')
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_Sh0"')
End Object`,

            smoke6way: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Sm6"
    CommentWidth=750
    CommentHeight=500
    NodeColor=(R=0.500000,G=0.500000,B=0.500000,A=1.000000)
    NodeComment="[UnrealFX AI] 6-Way Lit Volumetric Smoke Shading System"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_Sm6_0"
    SamplerType=SAMPLERTYPE_LinearColor
End Object
Begin Object Class=/Script/Engine.MaterialExpressionDotProduct Name="MaterialExpressionDotProduct_Sm6_0"
    A=(Expression=MaterialExpressionTextureSample'"MaterialExpressionTextureSample_Sm6_0"',OutputIndex=1)
End Object`,

            firecel: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Fi"
    CommentWidth=720
    CommentHeight=450
    NodeColor=(R=1.000000,G=0.200000,B=0.000000,A=1.000000)
    NodeComment="[UnrealFX AI] Cartoon Cel-Shaded Fire Mask Gradient"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Fi0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_Fi0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Fi0"')
    SpeedY=-0.600000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_Fi0"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_Fi0"')
End Object
Begin Object Class=/Script/Engine.MaterialExpressionStep Name="MaterialExpressionStep_Fi0"
    Input=(Expression=MaterialExpressionTextureSample'"MaterialExpressionTextureSample_Fi0"',OutputIndex=1)
End Object`,

            liquidblood: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Liq"
    CommentWidth=740
    CommentHeight=480
    NodeColor=(R=0.800000,G=0.000000,B=0.000000,A=1.000000)
    NodeComment="[UnrealFX AI] Fluid Liquid/Blood Refraction Normal scroller"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Liq0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_Liq0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Liq0"')
    SpeedX=0.050000
    SpeedY=-0.150000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_Liq0"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_Liq0"')
    SamplerType=SAMPLERTYPE_Normal
End Object`,

            gasfog: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Ga"
    CommentWidth=720
    CommentHeight=460
    NodeColor=(R=0.600000,G=0.650000,B=0.700000,A=1.000000)
    NodeComment="[UnrealFX AI] Soft Particle Atmospheric Gas Fog Scroller"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionDepthFade Name="MaterialExpressionDepthFade_Ga0"
    FadeDistance=200.000000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Ga0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_Ga0"
    Coordinate=(Expression=MaterialExpressionTextureCoordinate'"MaterialExpressionTextureCoordinate_Ga0"')
    SpeedX=0.100000
    SpeedY=-0.050000
End Object`,

            glitch: `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_Gl"
    CommentWidth=750
    CommentHeight=500
    NodeColor=(R=0.000000,G=1.000000,B=0.600000,A=1.000000)
    NodeComment="[UnrealFX AI] Cyberpunk Neon Glitch & Pixel Jitter"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_Gl0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTime Name="MaterialExpressionTime_Gl0"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionSine Name="MaterialExpressionSine_Gl0"
    Input=(Expression=MaterialExpressionTime'"MaterialExpressionTime_Gl0"')
    Period=0.100000
End Object`
        };

        // Graph visual layouts definitions (Nodes configuration)
        this.nodeLayouts = {
            glow: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 30, outPins: ['UV'] },
                { id: 'n2', title: 'Time', type: 'input', x: 20, y: 130, outPins: ['Time'] },
                { id: 'n3', title: 'Panner', type: 'math', x: 190, y: 60, inPins: ['Coordinate', 'Time'], outPins: ['UV'] },
                { id: 'n4', title: 'Noise Texture', type: 'math', x: 340, y: 60, inPins: ['UV'], outPins: ['RGB', 'R'] },
                { id: 'n5', title: 'Constant (50)', type: 'const', x: 340, y: 180, outPins: ['Value'] },
                { id: 'n6', title: 'Multiply', type: 'math', x: 480, y: 90, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n7', title: 'Material Output', type: 'output', x: 620, y: 100, inPins: ['Emissive'], outPins: [] }
            ],
            emissive: [
                { id: 'n1', title: 'Constant3Vector', type: 'input', x: 20, y: 30, outPins: ['RGB'] },
                { id: 'n2', title: 'Constant (80)', type: 'const', x: 20, y: 140, outPins: ['Value'] },
                { id: 'n3', title: 'Multiply', type: 'math', x: 220, y: 80, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n4', title: 'Emissive Color', type: 'output', x: 380, y: 90, inPins: ['Emissive'], outPins: [] }
            ],
            slashribbon: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 30, outPins: ['UV'] },
                { id: 'n2', title: 'ComponentMask (G)', type: 'math', x: 170, y: 30, inPins: ['In'], outPins: ['Out'] },
                { id: 'n3', title: 'Sine (Period: 1)', type: 'math', x: 300, y: 30, inPins: ['In'], outPins: ['Out'] },
                { id: 'n4', title: 'Particle Color', type: 'input', x: 170, y: 140, outPins: ['RGB', 'A'] },
                { id: 'n5', title: 'Multiply', type: 'math', x: 440, y: 80, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n6', title: 'Opacity/Emissive', type: 'output', x: 590, y: 90, inPins: ['RGB'], outPins: [] }
            ],
            decal: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 20, outPins: ['UV'] },
                { id: 'n2', title: 'Panner', type: 'math', x: 180, y: 20, inPins: ['Coordinate'], outPins: ['UV'] },
                { id: 'n3', title: 'Texture Sample (Normal)', type: 'math', x: 330, y: 20, inPins: ['UV'], outPins: ['RGB', 'Normal'] },
                { id: 'n4', title: 'Constant3Vector', type: 'input', x: 180, y: 160, outPins: ['RGB'] },
                { id: 'n5', title: 'Constant (35)', type: 'const', x: 180, y: 240, outPins: ['Value'] },
                { id: 'n6', title: 'Multiply', type: 'math', x: 340, y: 170, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n7', title: 'Material Output', type: 'output', x: 480, y: 90, inPins: ['Normal', 'Emissive'], outPins: [] }
            ],
            parallax: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 40, outPins: ['UV'] },
                { id: 'n2', title: 'Height Texture Sample', type: 'math', x: 180, y: 20, inPins: ['UV'], outPins: ['R'] },
                { id: 'n3', title: 'BumpOffset', type: 'math', x: 360, y: 60, inPins: ['Coordinate', 'Height'], outPins: ['UV'] },
                { id: 'n4', title: 'Texture Sample', type: 'math', x: 520, y: 60, inPins: ['UV'], outPins: ['RGB'] },
                { id: 'n5', title: 'Material Output', type: 'output', x: 680, y: 80, inPins: ['Emissive'], outPins: [] }
            ],
            distortion: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 20, outPins: ['UV'] },
                { id: 'n2', title: 'Panner', type: 'math', x: 170, y: 20, inPins: ['Coordinate'], outPins: ['UV'] },
                { id: 'n3', title: 'Texture Sample (Normal)', type: 'math', x: 310, y: 20, inPins: ['UV'], outPins: ['RGB'] },
                { id: 'n4', title: 'Constant (0.06)', type: 'const', x: 170, y: 150, outPins: ['Value'] },
                { id: 'n5', title: 'Multiply', type: 'math', x: 460, y: 80, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n6', title: 'Material Output', type: 'output', x: 590, y: 90, inPins: ['Refraction'], outPins: [] }
            ],
            shockwave: [
                { id: 'n1', title: 'RadialGradient', type: 'input', x: 20, y: 30, outPins: ['Out'] },
                { id: 'n2', title: 'Sine (Period: 0.2)', type: 'math', x: 180, y: 30, inPins: ['In'], outPins: ['Out'] },
                { id: 'n3', title: 'Constant (15)', type: 'const', x: 20, y: 130, outPins: ['Value'] },
                { id: 'n4', title: 'Multiply', type: 'math', x: 310, y: 60, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n5', title: 'Vector Parameter', type: 'input', x: 310, y: 160, outPins: ['RGB'] },
                { id: 'n6', title: 'Multiply', type: 'math', x: 450, y: 90, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n7', title: 'Material Output', type: 'output', x: 590, y: 100, inPins: ['Normal'], outPins: [] }
            ],
            smoke6way: [
                { id: 'n1', title: 'Vector Parameter', type: 'input', x: 20, y: 30, outPins: ['Vector'] },
                { id: 'n2', title: 'DotProduct', type: 'math', x: 180, y: 60, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n3', title: 'Texture Sample', type: 'math', x: 20, y: 130, outPins: ['RGB'] },
                { id: 'n4', title: 'Multiply', type: 'math', x: 320, y: 90, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n5', title: 'Material Output', type: 'output', x: 480, y: 100, inPins: ['Emissive'], outPins: [] }
            ],
            firecel: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 20, outPins: ['UV'] },
                { id: 'n2', title: 'Panner', type: 'math', x: 170, y: 20, inPins: ['Coordinate'], outPins: ['UV'] },
                { id: 'n3', title: 'Noise Texture', type: 'math', x: 310, y: 20, inPins: ['UV'], outPins: ['R'] },
                { id: 'n4', title: 'Step (Cel Border)', type: 'math', x: 460, y: 60, inPins: ['In', 'Threshold'], outPins: ['Out'] },
                { id: 'n5', title: 'Scalar Parameter (Threshold)', type: 'const', x: 310, y: 150, outPins: ['Value'] },
                { id: 'n6', title: 'Constant (5)', type: 'const', x: 460, y: 180, outPins: ['Value'] },
                { id: 'n7', title: 'Multiply', type: 'math', x: 610, y: 90, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n8', title: 'Material Output', type: 'output', x: 760, y: 95, inPins: ['Emissive'], outPins: [] }
            ],
            liquidblood: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 30, outPins: ['UV'] },
                { id: 'n2', title: 'Panner', type: 'math', x: 180, y: 30, inPins: ['Coordinate'], outPins: ['UV'] },
                { id: 'n3', title: 'Texture Sample (Normal)', type: 'math', x: 340, y: 20, inPins: ['UV'], outPins: ['RGB', 'Normal'] },
                { id: 'n4', title: 'Constant (0.08)', type: 'const', x: 340, y: 140, outPins: ['Value'] },
                { id: 'n5', title: 'Multiply', type: 'math', x: 500, y: 70, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n6', title: 'Depth Fade (150)', type: 'math', x: 500, y: 180, outPins: ['Out'] },
                { id: 'n7', title: 'Material Output', type: 'output', x: 660, y: 100, inPins: ['Normal', 'Opacity'], outPins: [] }
            ],
            gasfog: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 20, outPins: ['UV'] },
                { id: 'n2', title: 'Panner A', type: 'math', x: 170, y: 20, inPins: ['Coordinate'], outPins: ['UVs'] },
                { id: 'n3', title: 'Panner B', type: 'math', x: 170, y: 120, inPins: ['Coordinate'], outPins: ['UVs'] },
                { id: 'n4', title: 'Texture Sample A', type: 'math', x: 330, y: 20, inPins: ['UV'], outPins: ['R'] },
                { id: 'n5', title: 'Texture Sample B', type: 'math', x: 330, y: 120, inPins: ['UV'], outPins: ['R'] },
                { id: 'n6', title: 'Multiply', type: 'math', x: 500, y: 70, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n7', title: 'Depth Fade (200)', type: 'math', x: 500, y: 190, outPins: ['Out'] },
                { id: 'n8', title: 'Multiply', type: 'math', x: 650, y: 100, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n9', title: 'Material Output', type: 'output', x: 800, y: 110, inPins: ['Opacity'], outPins: [] }
            ],
            glitch: [
                { id: 'n1', title: 'TexCoord', type: 'input', x: 20, y: 30, outPins: ['UV'] },
                { id: 'n2', title: 'Time', type: 'input', x: 20, y: 120, outPins: ['Time'] },
                { id: 'n3', title: 'Sine (Period: 0.1)', type: 'math', x: 160, y: 90, inPins: ['In'], outPins: ['Out'] },
                { id: 'n4', title: 'Step', type: 'math', x: 300, y: 80, inPins: ['In'], outPins: ['Out'] },
                { id: 'n5', title: 'Add (Offset)', type: 'math', x: 440, y: 60, inPins: ['A', 'B'], outPins: ['Out'] },
                { id: 'n6', title: 'Material Output', type: 'output', x: 580, y: 70, inPins: ['Emissive'], outPins: [] }
            ]
        };

        // Standard preset descriptions
        this.nodeDescriptions = {
            glow: {
                title: 'Glowing Panner (발광 스크롤 셰이더)',
                desc: '파티클의 텍스처 좌표(UV)를 시간에 따라 이동시켜 동적인 유체나 화염, 에너지 흐름을 표현할 때 무조건 첫 번째로 쓰이는 핵심 머터리얼입니다.'
            },
            emissive: {
                title: 'Emissive Glow (고강도 발광 부스트)',
                desc: '색상 벡터 정보에 매우 높은 정밀 상수를 배가 곱하여 눈이 부시게 피어오르는 발광 폭발 구역을 잡고, 루멘 글로우 연계를 돕는 기초 필수 셰이더입니다.'
            },
            slashribbon: {
                title: 'Ribbon Trail (검기 슬래시 리본)',
                desc: '나이아가라 리본 렌더러에 매칭되는 노드 구조로, V축 마스킹을 활용해 끝단이 날카로운 쐐기 모양으로 칼같이 소멸하는 궤적 칼날을 표현합니다.'
            },
            decal: {
                title: 'Decal Custom DBuffer (데칼 DBuffer 정상 출력)',
                desc: '프로젝트 세팅의 DBuffer와 블렌드 모드가 Translucent + DBuffer Normal/Emissive 조건으로 맞물려, 루멘 및 VSM 지형 밑에서 음각 요철과 발광 마법진을 밝히는 필수 노드 배치 구조입니다.'
            },
            parallax: {
                title: '3D Parallax Crystal (패럴렉스 결정체 깊이)',
                desc: '시선 벡터(Camera Vector)에 비례한 UV 좌표 오프셋 왜곡을 유도하여, 평면 2D 폴리곤에 입체감 있는 3D 수정 코어나 얼음 깊이감을 빚어냅니다.'
            },
            distortion: {
                title: 'Screen Distortion (화면 굴절 디스토션 왜곡)',
                desc: '불길 열기나 강력한 폭발 충격파가 대기를 아지랑이처럼 굴절시켜 주변 공간을 둥글게 비틀어 버리는 굴절(Refraction) 픽셀 왜곡 셰이더입니다.'
            },
            shockwave: {
                title: 'Shockwave Ring (동심원 충격파 링)',
                desc: 'Radial 그라데이션과 고속 Sine 연산을 곱해 동심원 파형을 유도하고, 노말 벡터 연계로 강력한 방진 링을 그리는 특수 이펙트 노드입니다.'
            },
            smoke6way: {
                title: '6-Way Lit Smoke (6방향 조명 볼륨 연기)',
                desc: '2D 반투명 연기 파티클 임에도 전후좌우상하 6개 방향의 입체 명암 라이트 맵을 연동하여, 월드 실시간 3D 조명 각도에 볼륨감 넘치게 반응하도록 만듭니다.'
            },
            firecel: {
                title: 'Cel-Shaded Fire (스타일라이즈드 카툰 화염)',
                desc: '노이즈 패닝을 그대로 쓰지 않고 Step 노드로 깎아내 대비감이 칼로 딴 듯 날카롭게 잡히는 Cel-Shading 만화풍 불길 셰이더를 정립합니다.'
            },
            liquidblood: {
                title: 'Fluid Blood & Water (점성 피 / 물결 액체)',
                desc: '높은 굴절률과 조밀한 2중 패닝 Normal 스크롤, 그리고 Depth Fade의 바닥 경계 완화를 결합해 끈적끈적한 피나 유체를 묘사합니다.'
            },
            gasfog: {
                title: 'Soft Gas Fog (반투명 기체 대기 안개)',
                desc: '월드 지형에 포개져서 자르는 그래픽 에러를 Depth Fade로 완충하고, 2개 패너의 불규칙한 곱으로 아늑한 기체 흐름을 스크롤합니다.'
            },
            glitch: {
                title: 'SF Cyber Glitch (네온 디지털 글리치 지터)',
                desc: '시간 주기를 Sine으로 나누고 Step의 임계 임팩트를 Add하여 UV 좌표를 툭툭 흔들고, 픽셀 격자를 섞어 하이테크 가상 모니터 결함을 연출합니다.'
            }
        };

        // Wire connections maps (NodeID:PinIndex to NodeID:PinIndex)
        this.nodeWires = {
            glow: [
                { from: 'n1', fromPin: 'UV', to: 'n3', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'Time', to: 'n3', toPin: 'Time' },
                { from: 'n3', fromPin: 'UV', to: 'n4', toPin: 'UV' },
                { from: 'n4', fromPin: 'R', to: 'n6', toPin: 'A' },
                { from: 'n5', fromPin: 'Value', to: 'n6', toPin: 'B' },
                { from: 'n6', fromPin: 'Out', to: 'n7', toPin: 'Emissive' }
            ],
            emissive: [
                { from: 'n1', fromPin: 'RGB', to: 'n3', toPin: 'A' },
                { from: 'n2', fromPin: 'Value', to: 'n3', toPin: 'B' },
                { from: 'n3', fromPin: 'Out', to: 'n4', toPin: 'Emissive' }
            ],
            slashribbon: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'In' },
                { from: 'n2', fromPin: 'Out', to: 'n3', toPin: 'In' },
                { from: 'n3', fromPin: 'Out', to: 'n5', toPin: 'A' },
                { from: 'n4', fromPin: 'RGB', to: 'n5', toPin: 'B' },
                { from: 'n5', fromPin: 'Out', to: 'n6', toPin: 'RGB' }
            ],
            decal: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'UV', to: 'n3', toPin: 'UV' },
                { from: 'n3', fromPin: 'Normal', to: 'n7', toPin: 'Normal' },
                { from: 'n4', fromPin: 'RGB', to: 'n6', toPin: 'A' },
                { from: 'n5', fromPin: 'Value', to: 'n6', toPin: 'B' },
                { from: 'n6', fromPin: 'Out', to: 'n7', toPin: 'Emissive' }
            ],
            parallax: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'UV' },
                { from: 'n1', fromPin: 'UV', to: 'n3', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'R', to: 'n3', toPin: 'Height' },
                { from: 'n3', fromPin: 'UV', to: 'n4', toPin: 'UV' },
                { from: 'n4', fromPin: 'RGB', to: 'n5', toPin: 'Emissive' }
            ],
            distortion: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'UV', to: 'n3', toPin: 'UV' },
                { from: 'n3', fromPin: 'RGB', to: 'n5', toPin: 'A' },
                { from: 'n4', fromPin: 'Value', to: 'n5', toPin: 'B' },
                { from: 'n5', fromPin: 'Out', to: 'n6', toPin: 'Refraction' }
            ],
            shockwave: [
                { from: 'n1', fromPin: 'Out', to: 'n2', toPin: 'In' },
                { from: 'n2', fromPin: 'Out', to: 'n4', toPin: 'A' },
                { from: 'n3', fromPin: 'Value', to: 'n4', toPin: 'B' },
                { from: 'n4', fromPin: 'Out', to: 'n6', toPin: 'A' },
                { from: 'n5', fromPin: 'RGB', to: 'n6', toPin: 'B' },
                { from: 'n6', fromPin: 'Out', to: 'n7', toPin: 'Normal' }
            ],
            smoke6way: [
                { from: 'n1', fromPin: 'Vector', to: 'n2', toPin: 'A' },
                { from: 'n3', fromPin: 'RGB', to: 'n2', toPin: 'B' },
                { from: 'n2', fromPin: 'Out', to: 'n4', toPin: 'A' },
                { from: 'n3', fromPin: 'RGB', to: 'n4', toPin: 'B' },
                { from: 'n4', fromPin: 'Out', to: 'n5', toPin: 'Emissive' }
            ],
            firecel: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'UV', to: 'n3', toPin: 'UV' },
                { from: 'n3', fromPin: 'R', to: 'n4', toPin: 'In' },
                { from: 'n5', fromPin: 'Value', to: 'n4', toPin: 'Threshold' },
                { from: 'n4', fromPin: 'Out', to: 'n7', toPin: 'A' },
                { from: 'n6', fromPin: 'Value', to: 'n7', toPin: 'B' },
                { from: 'n7', fromPin: 'Out', to: 'n8', toPin: 'Emissive' }
            ],
            liquidblood: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'UV', to: 'n3', toPin: 'UV' },
                { from: 'n3', fromPin: 'Normal', to: 'n5', toPin: 'A' },
                { from: 'n4', fromPin: 'Value', to: 'n5', toPin: 'B' },
                { from: 'n5', fromPin: 'Out', to: 'n7', toPin: 'Normal' },
                { from: 'n6', fromPin: 'Out', to: 'n7', toPin: 'Opacity' }
            ],
            gasfog: [
                { from: 'n1', fromPin: 'UV', to: 'n2', toPin: 'Coordinate' },
                { from: 'n1', fromPin: 'UV', to: 'n3', toPin: 'Coordinate' },
                { from: 'n2', fromPin: 'UVs', to: 'n4', toPin: 'UV' },
                { from: 'n3', fromPin: 'UVs', to: 'n5', toPin: 'UV' },
                { from: 'n4', fromPin: 'R', to: 'n6', toPin: 'A' },
                { from: 'n5', fromPin: 'R', to: 'n6', toPin: 'B' },
                { from: 'n6', fromPin: 'Out', to: 'n8', toPin: 'A' },
                { from: 'n7', fromPin: 'Out', to: 'n8', toPin: 'B' },
                { from: 'n8', fromPin: 'Out', to: 'n9', toPin: 'Opacity' }
            ],
            glitch: [
                { from: 'n1', fromPin: 'UV', to: 'n5', toPin: 'A' },
                { from: 'n2', fromPin: 'Time', to: 'n3', toPin: 'In' },
                { from: 'n3', fromPin: 'Out', to: 'n4', toPin: 'In' },
                { from: 'n4', fromPin: 'Out', to: 'n5', toPin: 'B' },
                { from: 'n5', fromPin: 'Out', to: 'n6', toPin: 'Emissive' }
            ]
        };

        // Detailed master-class Korean explanations for each node in each preset
        this.nodeDetails = {
            glow: {
                'n1': { type: 'INPUT COORDINATE', role: '머터리얼의 기본 UV 좌표계(0~1 범위)를 출력하여 2D 공간의 텍스처 스크롤 및 매핑 기준을 잡습니다.', why: '텍스처가 특정 방향으로 일정하게 움직이게 하기 위한 공간적 시작점을 Panner 노드의 Coordinate 핀에 공급하기 위해서입니다.', effects: '검기 궤적, 흩날리는 나뭇잎, 스크롤 연기' },
                'n2': { type: 'TIME COUNTER', role: '지속적으로 흐르는 월드 시간 출력', why: '시간 경과에 비례하는 끊임없는 흐름을 Panner에 공급하여 움직임을 만들기 위해 연결합니다.', effects: '흐르는 용암, 수면 물결, 에너지 글로우' },
                'n3': { type: 'PANNER MATH', role: '시간에 비례한 UV 오프셋 이동 연산', why: '속도 벡터(SpeedY: -0.5)를 곱해 텍스처를 윗방향으로 연속 이동시키기 위해 연결합니다.', effects: '상승하는 불길, 마법진 내부 크랙 흐름' },
                'n4': { type: 'TEXTURE SAMPLE', role: '노이즈 텍스처 픽셀 정보 샘플링', why: '흐르는 UV 좌표에 입각하여 불규칙한 에너지 구름 패턴을 Multiply(곱하기)에 전달하기 위해 연결합니다.', effects: '오라 이펙트 외곽 마스킹, 먼지 구름 패턴' },
                'n5': { type: 'CONSTANT SCALER', role: '발광(Emissive) 배율 숫자(50) 정의', why: '최종 색상을 포스트 프로세스 블룸이 뿜어져 나오도록 밝기를 뻥튀기하기 위해 곱연산에 연결합니다.', effects: '초고휘도 레이저 빔, 충격파 섬광 코어' },
                'n6': { type: 'MULTIPLY MATH', role: '노이즈 텍스처와 발광 배율의 곱셉', why: '노이즈 알파 마스크를 50배 강도로 밝게 부스트하여 최종 발광 출력을 구성하기 위해 연결합니다.', effects: '네온 불빛, 폭발 글로우 파티클' },
                'n_depthfade': { type: 'DEPTH FADE MATH', role: '반투명 경계선 부드러운 완충', why: '지형이나 다른 메시에 닿을 때 나타나는 딱딱한 교차 각선 에러를 부드럽게 지워 연출합니다.', effects: '안개 스크롤, 바닥 수면 Ripple 경계 완충' }
            },
            emissive: {
                'n1': { type: 'CONSTANT 3 VECTOR', role: '기본 발광 색상(RGB) 결정', why: 'VFX 에너지의 고유 컬러 아이덴티티(예: 오렌지 화염색)를 결정하기 위해 곱연산에 전달합니다.', effects: '화염용 주황색 오라, 빙결용 시안블루' },
                'n2': { type: 'CONSTANT SCALER', role: '글로우 발광 배율 값(80) 선언', why: '기본 색상을 매우 밝게 부스트하여 눈부신 루멘 글로우와 블룸을 형성하기 위해 연결합니다.', effects: '네온 사인 발광 코어, 레이저 타격점 섬광' },
                'n3': { type: 'MULTIPLY MATH', role: '기본 색상과 배율 강도의 곱셉 연산', why: '결정된 에센셜 색채를 80배 강화하여 최종 글로우 파이프라인으로 쏴주기 위해 연결합니다.', effects: '마법 방어막 폭발, 칼날 기 모으기 글로우' },
                'n4': { type: 'FINAL OUTPUT', role: '최종 머터리얼 Emissive 출력 핀', why: 'GPU 셰이더 파이프라인에서 실제 빛을 내뿜어 월드에 반사되도록 피드백하기 위해 최종 핀으로 종결합니다.', effects: '모든 빛나는 이펙트 머터리얼의 필수 종결지' }
            },
            slashribbon: {
                'n1': { type: 'INPUT COORDINATE', role: '나이아가라 리본 전용 UV 좌표 출력', why: '리본 Trail 모델의 텍스처 축 정렬 좌표를 ComponentMask 노드로 걸러내기 위해 연결합니다.', effects: '무기 궤적 트레일, 궤도 투사체 후두부' },
                'n2': { type: 'COMPONENT MASK', role: 'G채널(V축 좌표) 단독 추출', why: '검기 궤적의 넓이 방향(V축 그라데이션)만 걸러내어 좌우 칼날 형태의 쐐기를 빚기 위해 연결합니다.', effects: '검기 리본 끝단 뾰족한 단면 마스크' },
                'n3': { type: 'SINE MATH', role: '사인 곡선 파형 그라데이션 마스크 형성', why: 'ComponentMask 출력값에 Sine 주기를 가해, 가운데는 선명하고 양끝은 투명하게 소멸하는 리본 쐐기 마스킹을 만듭니다.', effects: '날카로운 칼날 쐐기 궤적, 꼬리가 얇아지는 리본' },
                'n4': { type: 'PARTICLE COLOR', role: '나이아가라 파티클 색채 및 알파 바인딩', why: '나이아가라 이미터에서 실시간으로 프레임당 제어되는 파티클 색상과 투명도 소멸을 머터리얼과 동기화합니다.', effects: '점차 어두워지며 사라지는 검기 잔상 연출' },
                'n5': { type: 'MULTIPLY MATH', role: '리본 마스크와 나이아가라 동적 색상 곱', why: '사인 파형으로 형태를 잡은 칼날 마스크에 나이아가라 동적 소멸 알파를 곱해 부드러운 칼끝 소멸을 정립합니다.', effects: '스타일라이즈드 검기 궤적 형태 완성' },
                'n6': { type: 'FINAL OUTPUT', role: '최종 Opacity 및 Emissive 출력 정립', why: '계산된 색상과 투명도 쐐기 마스크를 최종 머터리얼 방출 파이프라인에 적용하기 위해 전달합니다.', effects: '나이아가라 트레일 이펙트 완성' }
            },
            decal: {
                'n1': { type: 'INPUT COORDINATE', role: '데칼 프로젝션용 UV 좌표 기준점', why: '투사된 데칼 표면 위에 패닝 텍스처를 곱하기 위해 Panner 노드로 좌표를 보냅니다.', effects: '바닥 폭발 그을음 데칼, 움직이는 마법 마법진' },
                'n2': { type: 'PANNER MATH', role: '데칼 UV 텍스처 좌표 패닝 이동', why: '데칼 가장자리가 서서히 스크롤되어 에너지 충전을 묘사하도록 속도 Y축(-0.2)을 적용해 연결합니다.', effects: '마법 영창 시 회전하는 바닥 마법진 크랙' },
                'n3': { type: 'DBUFFER NORMAL', role: 'DBuffer 데칼 요철 텍스처 요철 추출', why: '지형이나 돌 바닥의 라이팅 굴곡(Normal)에 직접 데칼 요철 음각을 새겨넣어 최종 출력으로 공급합니다.', effects: '바닥 충격으로 패인 크랙 요철, 젖어 있는 지면 데칼' },
                'n4': { type: 'CONSTANT 3 VECTOR', role: '데칼의 핵심 발광 색채 결정', why: '마법진이나 탄흔 중심부에서 피어오르는 발광 에너지 컬러를 정의하기 위해 연결합니다.', effects: '화염 마법진(빨간색), 독가스 장판(초록색)' },
                'n5': { type: 'CONSTANT SCALER', role: '데칼 이미시브 발광 강도(35) 조절', why: '월드 조명이 어두울 때도 선명하게 마법진 문양이 야광으로 빛나도록 증폭 배율을 전달합니다.', effects: '야간 전투용 빛나는 타격 탄흔 데칼' },
                'n6': { type: 'MULTIPLY MATH', role: '데칼 색상과 발광 증폭 강도의 곱', why: '설정한 마법진 색에 35배 강도를 가해 고휘도 발광을 뿜는 이미시브 컬러 데이터를 구축해 연결합니다.', effects: '고휘도 마법 장판 문양 폭발 글로우' },
                'n7': { type: 'FINAL OUTPUT', role: 'Decal Result 최종 요철 및 발광 출력', why: '프로젝트 세팅 DBuffer 블렌딩 규격에 맞춰 노말 요철과 발광 에너지를 지형 표면에 찍기 위해 종결합니다.', effects: 'VSM 지형 위에 완벽하게 포개져 라이팅을 받는 크랙 데칼' }
            },
            parallax: {
                'n1': { type: 'CAMERA VECTOR', role: '카메라가 오브젝트를 보는 시선 벡터(접공간) 연산', why: '보는 시야 각도에 입각해 2D 표면에 깊이 오프셋을 유도하기 위해 BumpOffset에 연결합니다.', effects: '오브젝트 3D 홀로그램, 얼음 속 깊은 크랙' },
                'n2': { type: 'BUMPOFFSET MATH', role: '시야각 비례 UV 오프셋 굴절 오버랩', why: '시선 방향으로 UV 좌표를 0.05 비율만큼 변형 밀어내어 평면 내부에 3D 공간감이 들도록 굴절시킵니다.', effects: '수정 구슬 내부 코어 깊이감, 판타지 얼음 내부' },
                'n3': { type: 'INPUT COORDINATE', role: '베이스 평면 2D UV 좌표 공급', why: 'BumpOffset 왜곡 계산의 시작점 좌표로서 원본 UV 위치를 넘겨주기 위해 연결합니다.', effects: '패럴렉스 깊이 셰이더 기초' },
                'n4': { type: 'TEXTURE SAMPLE', role: '왜곡된 좌표에 포개진 노이즈 수정 텍스처', why: 'BumpOffset에 의해 왜곡된 깊이 좌표로 3D 결정 형태 노이즈를 긁어와 입체감을 렌더링해 연결합니다.', effects: '수수께끼의 SF 홀로그램 입자 깊이감' },
                'n5': { type: 'FINAL OUTPUT', role: '최종 Emissive 출력 핀', why: '3D 가상 오프셋이 가미된 깊이 결정체 이미지를 최종 머터리얼 글로우 출력으로 공급해 종결합니다.', effects: '보석 머터리얼, 얼음벽 균열 입체감' }
            },
            distortion: {
                'n1': { type: 'INPUT COORDINATE', role: '디스토션 굴절 맵용 기본 UV 공급', why: '굴절 텍스처 패닝 좌표 스크롤링의 기본 위치를 공급하기 위해 Panner에 연결합니다.', effects: '충격파 왜곡 원형 스크롤' },
                'n2': { type: 'PANNER MATH', role: '왜곡 노말 텍스처 좌표 상승 스크롤', why: '불길 열기로 인해 위로 일렁이며 찌그러지는 왜곡 좌표를 위해 속도 Y축(-0.35)을 가해 연결합니다.', effects: '아지랑이 상승 왜곡, 화염 배기구 열기 왜곡' },
                'n3': { type: 'NORMAL TEXTURE SAMPLE', role: '일렁이는 아지랑이 굴절 노말 맵 긁기', why: '일렁이는 물결/바람 노말 벡터 정보를 추출하여 왜곡 굴절 좌표 오프셋 값으로 공급합니다.', effects: '물결 굴절, 유리 파편 왜곡' },
                'n4': { type: 'CONSTANT SCALER', role: '왜곡 세기 비율 스케일러(0.06) 설정', why: '노말 왜곡 값이 너무 과도하여 화면이 찢어지지 않도록 0.06 비율로 미세 세기를 제어하기 위해 곱합니다.', effects: '미세 열기 굴절 디스토션, 초강력 폭발 왜곡' },
                'n5': { type: 'MULTIPLY MATH', role: '노말 굴절 정보와 세기 스케일러의 곱', why: '완만하게 가공된 왜곡 픽셀 좌표 오프셋 데이터를 굴절 연산 회로로 넘기기 위해 곱하여 연결합니다.', effects: '잔잔하게 흐르는 물살 굴절 완성' },
                'n6': { type: 'FINAL OUTPUT', role: '최종 Refraction 화면 굴절 출력', why: '머터리얼 최종 굴절(Refraction) 핀에 공급해 오브젝트 뒤의 배경 픽셀들을 물리적으로 비틀어 연출합니다.', effects: '불길 배기구 아지랑이, 고속 이동 검기 아웃라인 디스토션' }
            },
            shockwave: {
                'n1': { type: 'RADIAL GRADIENT', role: '중심에서 뿜어져 나오는 동심원 그라데이션', why: '중심 타격점에서 퍼져나가는 원형 파동 에너지를 Sine 웨이브와 연동하기 위해 공급합니다.', effects: '둥근 충격파 고리, 장판 폭파 범위 마스크' },
                'n2': { type: 'SINE MATH', role: '동심원 주기 사인 리플 파동 형성', why: '원형 범위 그라데이션 마스크에 고주기(0.2)를 주어 잔물결 고리 링 패턴을 만들기 위해 연결합니다.', effects: '충격파 원형 주름 패턴 마스킹' },
                'n3': { type: 'CONSTANT SCALER', role: '파동 크기 증폭 비율(15) 정의', why: '파동 링 무늬의 물리 굴곡 돌출 강도를 15배로 확대하여 선명한 파도 높낮이를 세팅하기 위해 연결합니다.', effects: '바닥 충격파 고하중 높이 조절' },
                'n4': { type: 'MULTIPLY MATH', role: '사인 리플 파동과 돌출 강도의 곱', why: '충격파의 링 높낮이 강도를 15배로 부스팅하여 노말 돌출 벡터 변조부로 전달하기 위해 연결합니다.', effects: '폭발 시 땅이 파도치듯 솟구치는 링 형성' },
                'n5': { type: 'NORMAL VECTOR INPUT', role: '기본 월드 탄젠트 노말 벡터', why: '충격파 고리 웨이브 무늬를 월드 법선 방향 입체 요철로 꺾어주기 위해 노말 벡터 맵에 연결합니다.', effects: '충격파 3D 법선 렌더링 기틀' },
                'n6': { type: 'MULTIPLY MATH', role: '파동 높낮이 강도와 노말 벡터의 합성', why: '노말 방향벡터에 고주기 파동 링 값을 가중 연산하여 실제 빛의 반사가 굴곡지게 틀어지도록 유도합니다.', effects: '입체적인 충격파 링 형태 완성' },
                'n7': { type: 'FINAL OUTPUT', role: '최종 Normal 방향 굴곡 출력', why: '머터리얼의 Normal 핀에 물리 굴곡 파동을 적용해 빛의 표면 반사를 고리 모양으로 왜곡시켜 종결합니다.', effects: '음속 돌파 충격파, 물 표면 낙하 원형 파장' }
            },
            smoke6way: {
                'n1': { type: 'LIGHT DIRECTION', role: '실시간 월드 태양/조명 방향 벡터 수집', why: '입체 6방향 음양 명암 처리를 위해 실시간 월드 조명 각도를 DotProduct 연산에 공급합니다.', effects: '시간대별 그림자가 변하는 입체 연기 파티클' },
                'n2': { type: 'DOT PRODUCT', role: '실시간 라이트 방향과 노멀의 각도 연산', why: '조명 방향과 6방향 연기 노말 텍스처를 내적하여 빛을 받는 면(밝음)과 등지는 면(어두움)의 명암비를 도출합니다.', effects: '월드 조명에 입체 반응하는 연기 구름' },
                'n3': { type: '6WAY NORMAL MAP', role: '연기 전후좌우상하 라이트 채널 텍스처 샘플', why: '조명 방향에 맞게 볼륨감 있는 하이라이트와 그림자 구역을 정밀 샘플링하기 위해 공급합니다.', effects: 'AAA급 화염 폭발 연기 볼륨감' },
                'n4': { type: 'MULTIPLY MATH', role: '내적 명암비와 6방향 노말 마스크의 최종 합성', why: '실시간 조명 각도를 최종 그림자 명암 마스크에 투영해 입체 볼륨 광원을 완성하여 연결합니다.', effects: '실시간 조명에 반응하는 폭격 화염 연기' },
                'n5': { type: 'FINAL OUTPUT', role: '최종 Emissive 및 BaseColor 출력', why: '계산된 월드 방향 반응 명암을 머터리얼 칼라에 꽂아 3D 입체 반투명 스모크 셰이더를 마칩니다.', effects: 'AAA 콘솔 최적화 볼륨 연기 구현' }
            },
            firecel: {
                'n1': { type: 'INPUT COORDINATE', role: '만화풍 불길 그라데이션용 기본 UV', why: '노이즈 불길 문양을 패닝 상승시키기 위해 Panner 노드로 공급 연결합니다.', effects: '카툰 화염 상승 셰이더 기초' },
                'n2': { type: 'PANNER MATH', role: '만화풍 불길 좌표 초고속 상승 스크롤', why: '카툰 불꽃이 격렬하게 솟구치도록 속도 Y축(-0.6)을 고속 기용해 연결합니다.', effects: '만화풍 불길 분출, 번개 치는 구름 스크롤' },
                'n3': { type: 'NOISE TEXTURE SAMPLE', role: '절차적 구름 노이즈 알파 정보', why: 'Panner로 스크롤링되는 구름 모양 노이즈 알파를 문턱값 Step 노드에 깎아내기 위해 보냅니다.', effects: '카툰 불 덩어리 외곽 형태 마스크' },
                'n4': { type: 'STEP THRESHOLD MATH', role: '외곽 경계선을 칼날처럼 깎아내는 셀 셰이딩 연산', why: '노이즈의 완만한 그라데이션을 특정 문턱값(Threshold) 기준으로 칼로 딴 듯 대비 1과 0으로 쪼개기 위해 연결합니다.', effects: '스타일라이즈드 툰 화염, 카툰 셀 셰이더 외곽' },
                'n5': { type: 'CONSTANT SCALER', role: '툰 외곽선 발광 증폭 배율(5) 설정', why: '셀 화염 경계선이 카툰풍으로 선명하고 영롱하게 야광으로 빛나도록 5배 글로우 값을 선언해 곱합니다.', effects: '스타일라이즈드 불꽃 글로우 엣지' },
                'n6': { type: 'MULTIPLY MATH', role: 'Step으로 잘라낸 화염 마스크와 발광 강도 값을 곱합니다.', why: '실제 Unreal의 Multiply 노드를 의미합니다. 카툰 불길 마스크에 강도를 곱해 Emissive로 보낼 값을 만듭니다.', effects: '스타일라이즈드 불꽃 글로우 엣지' },
                'n7': { type: 'MATERIAL OUTPUT', role: 'Unreal 머터리얼의 최종 Emissive 입력을 의미하는 출력 카드입니다.', why: 'Multiply 결과를 Material Output의 Emissive 핀으로 전달하는 종착점을 표시합니다.', effects: '원신/귀멸스타일 카툰 화염 이펙트' }
            },
            liquidblood: {
                'n1': { type: 'INPUT COORDINATE', role: '액체 텍스처용 기본 UV 좌표', why: '점성 유체의 물살이 이중으로 비틀리게 흘러가게 만들기 위해 Panner 연산에 넘깁니다.', effects: '피웅덩이 흐름, 폭포 물살' },
                'n2': { type: 'NORMAL SCROLLER', role: '2중 조밀 패닝 노말 오버랩 스크롤', why: '서로 다른 방향과 속도로 비틀려 교차하는 2중 Normal 흐름을 합성해 점성 있는 피나 유체 파동을 묘사합니다.', effects: '끈적끈적한 피 요철, 유해 물질 액체 흐름' },
                'n3': { type: 'BLOOD VECTOR CONSTANT', role: '검붉은 피 고유 RGB 벡터값 정의', why: '잔인하고 점성 높은 혈흔 이펙트 전용 크림슨 레드 컬러 톤을 셰이더 코어에 연동하기 위해 곱에 연결합니다.', effects: '혈흔 유체 장판, 물결 반사 색채' },
                'n4': { type: 'DEPTH FADE MATH', role: '바닥 지형 경계 완충 페이드(150)', why: '피웅덩이가 월드 바닥 돌바닥과 만나는 외곽선을 깊이 완충하여 셰이더 깨짐 각선 에러를 지우기 위해 연결합니다.', effects: '바닥 혈흔 웅덩이 가장자리 완충' },
                'n5': { type: 'MULTIPLY MATH', role: '혈흔 색상과 점성 2중 노말 명암 곱', why: '검붉은 피 고유 색에 2중 Normal로 계산된 스펙큘러 조명 굴곡을 연동 곱하여 끈적한 유체 질감을 완성합니다.', effects: '타격 시 튀는 끈적끈적한 붉은 피 연출 완성' },
                'n6': { type: 'FINAL OUTPUT', role: '최종 Emissive 피 & 액체 유체 출력', why: '완성된 점성 액체 데이터(요철, 반사, 경계선 완충)를 최종 셰이더에 투영해 종결합니다.', effects: '몬스터 타격 혈흔 파티클, 용암 웅덩이 질감' }
            },
            gasfog: {
                'n1': { type: 'INPUT COORDINATE', role: '안개 안개 텍스처 정밀 UV', why: '서로 다른 바람 속도로 꼬여 움직이는 2개 패너에 동시에 좌표 기준점을 쏴주기 위해 병렬 연결합니다.', effects: '다중 레이어 안개 스크롤' },
                'n2': { type: 'PANNER A', role: '순방향 바람 스크롤 속도 벡터 A(0.1, -0.05)', why: '첫 번째 안개 구름 텍스처를 동남향 방향으로 부드럽게 흘려주기 위해 연결합니다.', effects: '느리게 흐르는 저지대 기체 안개' },
                'n3': { type: 'PANNER B', role: '역방향 바람 스크롤 속도 벡터 B(-0.05, 0.08)', why: '두 번째 안개 노이즈를 북서향 방향으로 꼬이듯 교차 스크롤시켜 단조로운 흐름을 파괴하기 위해 연결합니다.', effects: '불규칙한 바람에 출렁이는 산악 연무' },
                'n4': { type: 'MULTIPLY NOISE', role: '2중 교차 패너 노이즈 곱셈', why: '두 흐름을 곱해 어느 한곳도 일정하게 흐르지 않는 환상적이고 아늑한 대기성 기체 알파를 도출해 연결합니다.', effects: '절차적 대기 연무 구름 패턴 완성' },
                'n5': { type: 'DEPTH FADE MATH', role: '지형 바닥 충돌 경계선 부드러운 완충 페이드(200)', why: '안개 파티클 폴리곤이 땅을 자르는 보기 싫은 납작 각선 현상을 카메라 깊이 거리로 소프트하게 연출 완충합니다.', effects: '바닥에 밀착해 흐르는 저지대 기체 안개 최적화' },
                'n6': { type: 'FINAL OUTPUT', role: '최종 Opacity 반투명 대기 안개 완성', why: '바닥 칼선 완충이 완벽히 마감된 2중 교차 안개 마스크를 최종 머터리얼 Opacity(투명도) 핀에 적용해 마칩니다.', effects: 'AAA급 필드 저지대 독가스 안개, 신비로운 숲속 연무' }
            },
            glitch: {
                'n1': { type: 'INPUT COORDINATE', role: '모니터 픽셀 Jitter용 기본 UV', why: '시간 주기에 따라 툭툭 끊기며 찢어지는 Jitter 왜곡 좌표(Add)를 계산하기 위해 연결합니다.', effects: '디지털 모니터 노이즈 에러' },
                'n2': { type: 'TIME COUNTER', role: '하이테크 결함용 시간 신호 출력', why: '고주파수 프레임 지터를 위해 빠르게 진동하는 Sine 입력을 시간에 태워 연결합니다.', effects: 'SF 디지털 해킹 이펙트' },
                'n3': { type: 'SINE MATH', role: '초고속 고주파 사인 진동 파형', why: '시간값을 극단적인 주파수(Period: 0.1)로 나누어 초당 수십 번 눈을 깜빡이듯 흔들리는 신호를 빚어냅니다.', effects: '디지털 미터 진동, 형광등 깜빡임 오프셋' },
                'n4': { type: 'STEP JOLT MATH', role: '임계 돌발 충격 지터 추출', why: '진동하는 사인 파가 특정 높은 수치에 이를 때만 순간적으로 충격값 1을 툭 뱉어내 좌표를 좌우로 찢기 위해 연결합니다.', effects: '해킹 모니터 지익- 찢어지는 격자' },
                'n5': { type: 'ADD MATH', role: '기본 UV에 찢어지는 Jitter 값 강제 합산', why: '정상 텍스처 좌표에 돌발 지터 오프셋을 더해 화면 일부 픽셀을 순간적으로 옆으로 틀어 Jitter를 연출합니다.', effects: '글리치 노이즈 완성' },
                'n6': { type: 'MATERIAL OUTPUT', role: 'Unreal 머터리얼의 최종 Emissive 입력을 의미하는 출력 카드입니다. 실제 엔진 노드 이름이 Glitch라는 뜻은 아닙니다.', why: '찢어진 픽셀 좌표 데이터에 고강도 에러 글로우를 실어 최종 Material Output의 Emissive 핀으로 보낸다는 흐름을 표시합니다.', effects: '사이버펑크 네온 글리치, 홀로그램 해킹 경고장' }
            }
        };

        this.materialDocLinks = [
            { keys: ['panner', 'rotator', 'texcoord', 'texture coordinate', 'uv'], label: 'Coordinates Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/coordinates-material-expressions-in-unreal-engine' },
            { keys: ['particle color', 'dynamic parameter'], label: 'Particle Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/particle-expressions?application_version=4.27' },
            { keys: ['constant', 'scalar', 'vector', 'parameter'], label: 'Material Parameter Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-parameter-expressions-in-unreal-engine' },
            { keys: ['multiply', 'add', 'subtract', 'sine', 'power', 'dot', 'lerp', 'linear interp', 'smoothstep', 'step', 'one minus', 'componentmask', 'component mask', 'mask'], label: 'Math Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/math-material-expressions-in-unreal-engine' },
            { keys: ['texture sample', 'subuv', 'flipbook', 'noise texture', 'packed texture'], label: 'Textures in Unreal Engine', url: 'https://dev.epicgames.com/documentation/unreal-engine/textures-in-unreal-engine' },
            { keys: ['depth fade', 'scenedepth', 'scene depth', 'pixeldepth', 'pixel depth'], label: 'Depth Material Expressions', url: 'https://dev.epicgames.com/documentation/unreal-engine/depth-material-expressions-in-unreal-engine' },
            { keys: ['fresnel'], label: 'Fresnel Material Expression', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/using-fresnel-in-your-unreal-engine-materials' },
            { keys: ['bump', 'bumpoffset', 'parallax'], label: 'Bump Offset Material Expression', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/using-bump-offset-in-unreal-engine' },
            { keys: ['world position offset', 'wpo', 'vertex normal', 'vertex offset'], label: 'Material Inputs: World Position Offset', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-inputs-in-unreal-engine' },
            { keys: ['refraction', 'distortion'], label: 'Material Properties: Refraction', url: 'https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-material-properties?lang=en-US' },
            { keys: ['emissive', 'opacity', 'opacity mask', 'normal', 'roughness', 'specular', 'output', 'material output'], label: 'Material Inputs', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-inputs-in-unreal-engine' },
            { keys: ['worldalignedtexture', 'world aligned'], label: 'Texturing Material Functions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/texturing-material-functions-in-unreal-engine' }
            ,
            { keys: ['spheremask', 'sphere mask', 'distance', 'distance field', 'distancetonearestsurface'], label: 'Utility Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine' },
            { keys: ['dithertemporalaa', 'dither temporal'], label: 'DitherTemporalAA Material Expression', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/utility-material-expressions-in-unreal-engine' },
            { keys: ['vertex color', 'vertexcolor'], label: 'Vertex Color Materials', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/vertex-color-materials' },
            { keys: ['material function', 'function input', 'function output', 'material function call'], label: 'Material Functions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/material-functions-in-unreal-engine' },
            { keys: ['curve atlas', 'curve atlas row'], label: 'Curve Atlases in Materials', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/curve-atlases-in-materials?application_version=4.27' },
            { keys: ['desaturation'], label: 'Image Adjustment Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/image-adjustment-material-functions-in-unreal-engine' },
            { keys: ['camera position', 'camerapositionws', 'objectpositionws', 'absolute world position'], label: 'Vector Material Expressions', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/vector-material-expressions-in-unreal-engine' }
        ];

        this.registerAdditionalTechniquePresets();
        this.validationIssues = this.validateNodePresetIntegrity();

        // Scale base preset layout coordinates to ensure spacious positioning and prevent overlaps!
        for (let preset in this.nodeLayouts) {
            this.nodeLayouts[preset].forEach(node => {
                node.x = Math.round(node.x * 1.6);
                node.y = Math.round(node.y * 1.3);
            });
        }

        // Initialize Middle-Click Panning and Wheel Zoom Engine
        this.initPanZoom();
    }

    validateNodePresetIntegrity() {
        const issues = [];

        Object.keys(this.nodeWires).forEach(preset => {
            const nodes = this.nodeLayouts[preset] || [];
            const nodeMap = new Map(nodes.map(node => [node.id, node]));

            (this.nodeWires[preset] || []).forEach(wire => {
                const fromNode = nodeMap.get(wire.from);
                const toNode = nodeMap.get(wire.to);

                if (!fromNode) {
                    issues.push(`${preset}: missing source node ${wire.from}`);
                    return;
                }

                if (!toNode) {
                    issues.push(`${preset}: missing target node ${wire.to}`);
                    return;
                }

                if (!((fromNode.outPins || []).includes(wire.fromPin))) {
                    issues.push(`${preset}: ${wire.from}.${wire.fromPin} is not an output pin`);
                }

                if (!((toNode.inPins || []).includes(wire.toPin))) {
                    issues.push(`${preset}: ${wire.to}.${wire.toPin} is not an input pin`);
                }
            });
        });

        if (issues.length) {
            console.warn('[MaterialLab] Node preset validation issues:', issues);
        }

        return issues;
    }

    registerAdditionalTechniquePresets() {
        const techniques = [
            {
                key: 'particlecolor',
                title: 'Particle Color Bind (Niagara 색상/알파 바인딩)',
                desc: 'Niagara의 Color, Alpha, Dynamic Parameter를 머터리얼에 직접 전달하는 가장 기본적인 실무 바인딩입니다. 콘솔/캐주얼 모두에서 파티클 수명 소멸과 컬러 그레이딩 제어에 필수입니다.',
                nodes: ['Particle Color', 'ComponentMask (A)', 'Multiply', 'Opacity'],
                tags: 'niagara particle color alpha opacity mobile console'
            },
            {
                key: 'flipbook',
                title: 'SubUV Flipbook (연속 프레임 시트 재생)',
                desc: '폭발, 연기, 물보라처럼 시뮬레이션을 프레임 시트로 구워 사용하는 실무 표준 패턴입니다. 저사양 플랫폼에서는 실시간 계산보다 Flipbook이 훨씬 안정적입니다.',
                nodes: ['Particle SubUV', 'Texture Sample', 'LinearInterpolate', 'Emissive'],
                tags: 'flipbook subuv sprite sheet explosion smoke mobile'
            },
            {
                key: 'alphaerosion',
                title: 'Alpha Erosion (노이즈 기반 소멸 마스크)',
                desc: 'Dissolve, Burn-out, Spawn-in 효과에 쓰이는 임계값 기반 알파 침식 구조입니다. SmoothStep/Step 계열로 경계 폭을 통제해 스타일라이즈드와 리얼 모두에 대응합니다.',
                nodes: ['Texture Sample', 'SmoothStep', 'Multiply', 'Opacity Mask'],
                tags: 'dissolve erosion smoothstep alpha mask threshold'
            },
            {
                key: 'fresnelrim',
                title: 'Fresnel Rim Light (외곽 림 발광)',
                desc: '표면 노멀과 카메라 벡터 각도에 따라 외곽선 발광을 만드는 VFX 클래식입니다. 쉴드, 홀로그램, 피격 하이라이트, 마법 구체에 광범위하게 쓰입니다.',
                nodes: ['Fresnel', 'Power', 'Multiply', 'Emissive'],
                tags: 'fresnel rim shield hologram console'
            },
            {
                key: 'depthfade',
                title: 'Depth Fade Soft Edge (반투명 경계 완충)',
                desc: '반투명 파티클이 지형과 만나는 경계의 딱딱한 절단선을 완화합니다. 안개, 물, 피웅덩이, 먼지, 포탈 가장자리에 거의 항상 검토되는 노드입니다.',
                nodes: ['DepthFade', 'Saturate', 'Multiply', 'Opacity'],
                tags: 'depth fade soft particle opacity fog water mobile'
            },
            {
                key: 'worldaligned',
                title: 'World Aligned UV (월드 좌표 텍스처링)',
                desc: '메시 UV에 의존하지 않고 월드 좌표 기준으로 텍스처를 투영합니다. 지형 크랙, 눈/먼지 축적, 큰 범위 장판 효과에서 타일링 일관성을 유지합니다.',
                nodes: ['Texture Object', 'WorldAlignedTexture', 'Multiply', 'BaseColor'],
                tags: 'world aligned texture decal terrain console'
            },
            {
                key: 'vertexoffset',
                title: 'Vertex Offset Motion (WPO 흔들림)',
                desc: 'World Position Offset을 이용해 메시나 리본 표면을 흔들고 밀어내는 구조입니다. 바람, 열기, 포탈 표면, 충격파 메시에 적합하지만 모바일에서는 강도를 절제해야 합니다.',
                nodes: ['Time', 'Sine', 'Multiply', 'World Position Offset'],
                tags: 'wpo vertex offset wind wave console'
            },
            {
                key: 'mobileadditive',
                title: 'Mobile Additive Sprite (캐주얼 저비용 발광)',
                desc: 'Depth/Refraction/복잡한 노이즈를 줄이고 Additive + Packed Mask 위주로 구성하는 모바일 친화형 발광 파티클 패턴입니다.',
                nodes: ['Texture Sample', 'ComponentMask (R)', 'Multiply', 'Emissive'],
                tags: 'mobile casual additive sprite cheap overdraw'
            },
            {
                key: 'softparticle',
                title: 'Soft Particle Blend (카메라 깊이 기반 소프트 파티클)',
                desc: 'DepthFade와 SceneDepth 기반으로 파티클 교차선을 줄이는 표준 최적화/품질 패턴입니다. AAA 연기와 캐주얼 먼지 모두에서 자주 쓰입니다.',
                nodes: ['SceneDepth', 'Subtract', 'Saturate', 'Opacity'],
                tags: 'soft particle scenedepth pixeldepth fog smoke'
            },
            {
                key: 'channelpacked',
                title: 'Channel Packed Masks (RGB 채널 마스크 패킹)',
                desc: 'R/G/B/A 각각에 서로 다른 마스크를 넣어 텍스처 샘플 수를 줄이는 실무 최적화 패턴입니다. 콘솔과 모바일 모두에서 메모리/샘플 비용 절감 효과가 큽니다.',
                nodes: ['Texture Sample', 'ComponentMask (R/G/B)', 'LinearInterpolate', 'Opacity Mask'],
                tags: 'packed mask rgb channel optimization mobile console'
            },
            {
                key: 'hueramp',
                title: 'Hue Ramp / Gradient Map (색상 램프 보간)',
                desc: '흑백 마스크를 컬러 램프에 매핑해 화염, 독, 마법 속성별 컬러 변주를 빠르게 만드는 패턴입니다. 아트 디렉션 변경 대응에 특히 좋습니다.',
                nodes: ['Texture Sample', 'ComponentMask (R)', 'LinearInterpolate', 'Emissive'],
                tags: 'gradient ramp color fire poison stylized'
            },
            {
                key: 'cheapnoise',
                title: 'Cheap Procedural Noise (저비용 절차 노이즈)',
                desc: '비싼 3D 노이즈 대신 2D 노이즈, Panner, Multiply/Add 조합으로 충분한 무작위성을 만드는 캐주얼/모바일 실무 패턴입니다.',
                nodes: ['TexCoord', 'Panner', 'Texture Sample', 'Opacity'],
                tags: 'cheap noise mobile panner procedural'
            },
            {
                key: 'spheremask',
                title: 'Sphere Mask Reveal (구형 범위 생성/소멸)',
                desc: 'SphereMask로 중심점에서 퍼지는 생성, 포탈 오픈, 충돌 범위 표시를 만드는 실무 마스크 패턴입니다.',
                nodes: ['Absolute World Position', 'SphereMask', 'SmoothStep', 'Opacity Mask'],
                tags: 'sphere mask reveal spawn dissolve range'
            },
            {
                key: 'radialgradient',
                title: 'Radial Gradient Mask (원형 링/범위 마스크)',
                desc: 'RadialGradientExponential 기반으로 장판 범위, 쇼크웨이브 링, UI형 VFX 원형 마스크를 빠르게 구성합니다.',
                nodes: ['RadialGradientExponential', 'OneMinus', 'Power', 'Opacity'],
                tags: 'radial gradient ring shockwave decal'
            },
            {
                key: 'dithertaa',
                title: 'Dither Temporal AA Fade (불투명 디더 페이드)',
                desc: 'Translucent 대신 Masked + DitherTemporalAA로 오브젝트/파티클을 비교적 저렴하게 페이드시키는 패턴입니다.',
                nodes: ['Scalar Parameter', 'DitherTemporalAA', 'Multiply', 'Opacity Mask'],
                tags: 'dither temporal aa masked fade optimization'
            },
            {
                key: 'distancemask',
                title: 'Distance Cull Fade (거리 기반 감쇄)',
                desc: 'Camera Position과 World Position 거리 기반으로 원거리 이펙트의 알파나 발광을 줄이는 최적화 패턴입니다.',
                nodes: ['CameraPositionWS', 'Distance', 'Saturate', 'Opacity'],
                tags: 'distance fade lod cull optimization'
            },
            {
                key: 'cameradepth',
                title: 'Camera Depth Fade (카메라 근접 페이드)',
                desc: '카메라에 너무 가까운 파티클이 화면을 뒤덮는 문제를 PixelDepth 계열로 완화하는 패턴입니다.',
                nodes: ['PixelDepth', 'Divide', 'Saturate', 'Opacity'],
                tags: 'camera depth pixeldepth opacity fade'
            },
            {
                key: 'flowmap',
                title: 'Flow Map Distortion (방향성 유체 흐름)',
                desc: 'Flow Map 텍스처의 RG 벡터로 UV를 밀어 물, 용암, 독가스가 방향성 있게 흐르도록 만드는 패턴입니다.',
                nodes: ['Texture Sample', 'AppendVector', 'Add', 'Customized UVs'],
                tags: 'flow map water lava uv distortion'
            },
            {
                key: 'normalblend',
                title: 'Normal Map Blend (노멀 합성)',
                desc: '두 노멀 맵을 BlendAngleCorrectedNormals로 합성해 표면 요철을 강화합니다.',
                nodes: ['Texture Sample', 'Texture Sample', 'BlendAngleCorrectedNormals', 'Normal'],
                tags: 'normal blend angle corrected normals surface'
            },
            {
                key: 'twopanner',
                title: 'Two Panner Noise (2중 패너 노이즈)',
                desc: '서로 다른 방향과 속도의 Panner 두 개를 곱해 단조로운 텍스처 흐름을 깨는 가장 흔한 VFX 패턴입니다.',
                nodes: ['TexCoord', 'Panner', 'Texture Sample', 'Opacity'],
                tags: 'two panner noise fog fire energy'
            },
            {
                key: 'uvrotate',
                title: 'Rotator UV Motion (회전 UV)',
                desc: 'Rotator 노드로 마법진, 포탈, 회오리 텍스처를 회전시키는 기본 패턴입니다.',
                nodes: ['TexCoord', 'Rotator', 'Texture Sample', 'Emissive'],
                tags: 'rotator uv magic circle portal'
            },
            {
                key: 'objectmask',
                title: 'Object Position Mask (오브젝트 기준 마스크)',
                desc: 'ObjectPositionWS와 AbsoluteWorldPosition을 이용해 오브젝트 중심 기준 마스크를 만드는 패턴입니다.',
                nodes: ['ObjectPositionWS', 'Subtract', 'Distance', 'Opacity Mask'],
                tags: 'object position mask world position reveal'
            },
            {
                key: 'distancefield',
                title: 'Distance Field Fade (거리 필드 페이드)',
                desc: 'DistanceToNearestSurface 기반으로 표면 접촉부, 지형 근접 연무, 오브젝트 주변 감쇄를 만드는 고급 패턴입니다.',
                nodes: ['DistanceToNearestSurface', 'SmoothStep', 'Saturate', 'Opacity'],
                tags: 'distance field fade surface contact fog'
            },
            {
                key: 'runtimeparam',
                title: 'Runtime Scalar Parameter (런타임 파라미터 제어)',
                desc: 'Blueprint, Material Instance Dynamic, Niagara Dynamic Parameter로 값이 바뀌는 Scalar Parameter 제어 패턴입니다.',
                nodes: ['Scalar Parameter', 'Time', 'Multiply', 'Emissive'],
                tags: 'runtime scalar parameter dynamic material instance'
            },
            {
                key: 'materialfunction',
                title: 'Material Function Wrapper (함수화 패턴)',
                desc: '반복 노드 묶음을 Material Function으로 감싸 재사용성과 유지보수성을 높이는 프로덕션 패턴입니다.',
                nodes: ['Function Input', 'Material Function Call', 'Function Output', 'Emissive'],
                tags: 'material function reuse library production'
            },
            {
                key: 'flipbookblend',
                title: 'Flipbook Frame Blend (프레임 보간)',
                desc: 'Flipbook/SubUV 프레임 사이를 LinearInterpolate로 보간해 프레임 튐을 줄이는 패턴입니다.',
                nodes: ['Texture Sample', 'Frac', 'LinearInterpolate', 'Emissive'],
                tags: 'flipbook blend subuv frame interpolation'
            },
            {
                key: 'vertexcolor',
                title: 'Vertex Color Mask (버텍스 컬러 마스크)',
                desc: 'Mesh Particle이나 Static Mesh VFX에서 Vertex Color 채널을 마스크로 쓰는 패턴입니다.',
                nodes: ['Vertex Color', 'ComponentMask (R)', 'LinearInterpolate', 'BaseColor'],
                tags: 'vertex color mask mesh particle'
            },
            {
                key: 'desaturation',
                title: 'Desaturation Hit Flash (피격 색상 플래시)',
                desc: 'Desaturation과 Lerp로 피격 순간 색상 플래시, 흑백화, 상태 이상 강조를 만드는 패턴입니다.',
                nodes: ['Texture Sample', 'Desaturation', 'LinearInterpolate', 'BaseColor'],
                tags: 'desaturation hit flash color lerp'
            }
        ];

        techniques.forEach((tech, index) => this.registerTechniquePreset(tech, index));
    }

    registerTechniquePreset(tech, index) {
        const color = [
            '(R=0.200000,G=0.700000,B=1.000000,A=1.000000)',
            '(R=0.600000,G=0.900000,B=0.250000,A=1.000000)',
            '(R=1.000000,G=0.450000,B=0.250000,A=1.000000)'
        ][index % 3];

        this.unrealCopyTexts[tech.key] = `Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_${tech.key}"
    CommentWidth=760
    CommentHeight=430
    NodeColor=${color}
    NodeComment="[UnrealFX] ${tech.title}"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureCoordinate Name="MaterialExpressionTextureCoordinate_${tech.key}"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionParticleColor Name="MaterialExpressionParticleColor_${tech.key}"
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_${tech.key}"
End Object`;

        const presetNodes = [
            this.createTechniqueNode('n1', tech.nodes[0], 'input', 20, 30),
            this.createTechniqueNode('n2', tech.nodes[1], 'math', 190, 30),
            this.createTechniqueNode('n3', tech.nodes[2], 'math', 360, 70),
            { id: 'n4', title: 'Material Output', type: 'output', x: 540, y: 80, inPins: [tech.nodes[3]], outPins: [] }
        ];

        this.nodeLayouts[tech.key] = presetNodes;

        this.nodeDescriptions[tech.key] = {
            title: tech.title,
            desc: `${tech.desc} 검색 키워드: ${tech.tags}.`
        };

        this.nodeWires[tech.key] = [
            { from: 'n1', fromPin: this.getPrimaryOutputPin(presetNodes[0]), to: 'n2', toPin: this.getPrimaryInputPin(presetNodes[1]) },
            { from: 'n2', fromPin: this.getPrimaryOutputPin(presetNodes[1]), to: 'n3', toPin: this.getPrimaryInputPin(presetNodes[2]) },
            { from: 'n3', fromPin: this.getPrimaryOutputPin(presetNodes[2]), to: 'n4', toPin: tech.nodes[3] }
        ];

        this.nodeDetails[tech.key] = {
            n1: { type: 'SOURCE', role: `${tech.nodes[0]} 입력을 통해 이 기술의 기준 데이터나 마스크를 가져옵니다.`, why: '그래프의 출발점을 명확히 분리하면 플랫폼별 대체 입력을 빠르게 바꿀 수 있습니다.', effects: tech.desc },
            n2: { type: 'FILTER / TRANSFORM', role: `${tech.nodes[1]} 단계에서 입력 데이터를 목적에 맞게 추출하거나 변형합니다.`, why: '불필요한 채널과 연산을 줄이고, 후속 합성 단계에서 제어하기 쉬운 신호로 정리합니다.', effects: '콘솔/캐주얼 공통 셰이더 유지보수에 유리합니다.' },
            n3: { type: 'COMBINE', role: `${tech.nodes[2]} 단계에서 색상, 알파, 강도, 마스크를 합성합니다.`, why: 'VFX 머터리얼 대부분은 마스크와 강도값의 곱/보간으로 최종 룩을 통제합니다.', effects: '아트 디렉션 변경 시 값만 바꿔 빠르게 대응할 수 있습니다.' },
            n4: { type: 'MATERIAL OUTPUT', role: `Unreal 머터리얼의 ${tech.nodes[3]} 입력 핀으로 최종 결과를 전달하는 출력 카드입니다.`, why: '이 카드는 실제 커스텀 노드가 아니라 Material Output의 해당 입력 핀을 의미합니다.', effects: tech.tags }
        };
    }
    
    createTechniqueNode(id, title, type, x, y) {
        const normalized = title.toLowerCase();
        const node = { id, title, type, x, y, inPins: ['In'], outPins: ['Out'] };

        if (type === 'input') delete node.inPins;

        if (normalized.includes('texcoord') || normalized.includes('texture coordinate')) {
            node.outPins = ['UV'];
        } else if (normalized.includes('panner') || normalized.includes('rotator')) {
            node.inPins = ['Coordinate'];
            node.outPins = ['UV'];
        } else if (normalized.includes('texture sample') || normalized.includes('subuv')) {
            node.inPins = ['UV'];
            node.outPins = ['RGB', 'R', 'A'];
        } else if (normalized.includes('texture object')) {
            delete node.inPins;
            node.outPins = ['Texture'];
        } else if (normalized.includes('worldalignedtexture')) {
            node.inPins = ['TextureObject'];
            node.outPins = ['RGB'];
        } else if (normalized.includes('multiply') || normalized.includes('add') || normalized.includes('subtract') || normalized.includes('divide') || normalized === 'distance') {
            node.inPins = ['A', 'B'];
            node.outPins = ['Out'];
        } else if (normalized.includes('linearinterpolate') || normalized.includes('lerp')) {
            node.inPins = ['A', 'B', 'Alpha'];
            node.outPins = ['Out'];
        } else if (normalized.includes('componentmask')) {
            node.inPins = ['In'];
            node.outPins = ['Out'];
        } else if (normalized.includes('smoothstep')) {
            node.inPins = ['Value'];
            node.outPins = ['Out'];
        } else if (normalized.includes('step')) {
            node.inPins = ['In', 'Threshold'];
            node.outPins = ['Out'];
        } else if (normalized.includes('saturate') || normalized.includes('power') || normalized.includes('sine') || normalized.includes('frac') || normalized.includes('desaturation')) {
            node.inPins = ['In'];
            node.outPins = ['Out'];
        } else if (normalized.includes('blendanglecorrectednormals')) {
            node.inPins = ['A', 'B'];
            node.outPins = ['Normal'];
        } else if (normalized.includes('depthfade') || normalized.includes('scenedepth') || normalized.includes('pixeldepth') || normalized.includes('fresnel') || normalized.includes('vertex color') || normalized.includes('particle color') || normalized.includes('camera') || normalized.includes('objectposition') || normalized.includes('absolute world position') || normalized.includes('distancetonearestsurface') || normalized.includes('scalar parameter') || normalized.includes('curve atlas') || normalized.includes('function input')) {
            delete node.inPins;
            node.outPins = ['Out'];
        } else if (normalized.includes('constant3vector') || normalized.includes('vertexnormalws')) {
            delete node.inPins;
            node.outPins = ['RGB'];
        }

        if (type === 'input' && node.inPins) delete node.inPins;
        return node;
    }

    getPrimaryOutputPin(node) {
        if (!node || !node.outPins || !node.outPins.length) return 'Out';
        if (node.outPins.includes('UV')) return 'UV';
        if (node.outPins.includes('RGB')) return 'RGB';
        if (node.outPins.includes('Normal')) return 'Normal';
        if (node.outPins.includes('R')) return 'R';
        return node.outPins[0];
    }

    getPrimaryInputPin(node) {
        if (!node || !node.inPins || !node.inPins.length) return 'In';
        if (node.inPins.includes('Coordinate')) return 'Coordinate';
        if (node.inPins.includes('UV')) return 'UV';
        if (node.inPins.includes('TextureObject')) return 'TextureObject';
        if (node.inPins.includes('Value')) return 'Value';
        if (node.inPins.includes('In')) return 'In';
        if (node.inPins.includes('A')) return 'A';
        return node.inPins[0];
    }

    renderGraph(presetName) {
        this.currentPreset = presetName;
        
        // Reset pan & zoom positions on fresh preset loads
        this.resetPanZoom();

        const container = document.getElementById('nodeGraphContainer');
        if (!container) return;
        
        // Clean container
        container.innerHTML = '';
        
        // 1. Render Wires Layer (SVG)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class', 'wires-svg');
        container.appendChild(svg);
        
        // 2. Render Node HTML structures
        const nodes = this.nodeLayouts[presetName] || [];
        nodes.forEach(node => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = `ue-node`;
            nodeDiv.id = `node-${node.id}`;
            nodeDiv.style.left = `${node.x}px`;
            nodeDiv.style.top = `${node.y}px`;
            
            // Header
            const header = document.createElement('div');
            header.className = `ue-node-header ${node.type}`;
            header.innerHTML = `<span>${node.title.split(' ')[0]}</span>`;
            nodeDiv.appendChild(header);
            
            // Body
            const body = document.createElement('div');
            body.className = 'ue-node-body';
            
            const titleInline = document.createElement('div');
            titleInline.className = 'node-title-inline';
            titleInline.innerText = node.title;
            body.appendChild(titleInline);
            
            // Calculate pins rows
            const maxPinsCount = Math.max(node.inPins ? node.inPins.length : 0, node.outPins ? node.outPins.length : 0);
            for (let i = 0; i < maxPinsCount; i++) {
                const pinRow = document.createElement('div');
                pinRow.className = 'ue-node-pin-row';
                
                // Input pin
                const inPinName = node.inPins && node.inPins[i] ? node.inPins[i] : '';
                const inPinDiv = document.createElement('div');
                inPinDiv.className = 'pin input';
                if (inPinName) {
                    inPinDiv.innerHTML = `<span class="pin-dot"></span><span>${inPinName}</span>`;
                    inPinDiv.id = `pin-in-${node.id}-${inPinName}`;
                }
                pinRow.appendChild(inPinDiv);
                
                // Output pin
                const outPinName = node.outPins && node.outPins[i] ? node.outPins[i] : '';
                const outPinDiv = document.createElement('div');
                outPinDiv.className = 'pin output';
                if (outPinName) {
                    outPinDiv.innerHTML = `<span>${outPinName}</span><span class="pin-dot"></span>`;
                    outPinDiv.id = `pin-out-${node.id}-${outPinName}`;
                }
                pinRow.appendChild(outPinDiv);
                
                body.appendChild(pinRow);
            }
            
            nodeDiv.appendChild(body);
            container.appendChild(nodeDiv);
        });

        // [NEW] 2.5 Bind Click Events on newly rendered .ue-node cards
        const nodeElements = container.querySelectorAll('.ue-node');
        nodeElements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();
                nodeElements.forEach(n => n.classList.remove('selected'));
                elem.classList.add('selected');
                const nodeId = elem.id.replace('node-', '');
                this.inspectNode(presetName, nodeId);
            });
        });
        
        // Clear selection on viewport click
        container.addEventListener('click', () => {
            nodeElements.forEach(n => n.classList.remove('selected'));
            this.clearInspector();
        });
        
        // 3. Draw SVG paths connecting pin positions
        setTimeout(() => {
            const wires = this.nodeWires[presetName] || [];
            wires.forEach(wire => {
                const outPin = document.getElementById(`pin-out-${wire.from}-${wire.fromPin}`);
                const inPin = document.getElementById(`pin-in-${wire.to}-${wire.toPin}`);
                
                if (outPin && inPin) {
                    const outRect = outPin.querySelector('.pin-dot').getBoundingClientRect();
                    const inRect = inPin.querySelector('.pin-dot').getBoundingClientRect();
                    const viewRect = container.getBoundingClientRect();
                    
                    // Coordinates relative to nodeGraphContainer (zoom-invariant)
                    const x1 = (outRect.left + outRect.width/2 - viewRect.left) / this.zoom;
                    const y1 = (outRect.top + outRect.height/2 - viewRect.top) / this.zoom;
                    const x2 = (inRect.left + inRect.width/2 - viewRect.left) / this.zoom;
                    const y2 = (inRect.top + inRect.height/2 - viewRect.top) / this.zoom;
                    
                    // Draw beautiful Bezier curve
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const offset = Math.abs(x2 - x1) * 0.5;
                    const d = `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
                    
                    path.setAttribute('d', d);
                    path.setAttribute('class', 'wire-path glowing');
                    svg.appendChild(path);
                }
            });
        }, 50);
        
        // 4. Update UI labels and descriptions
        const info = this.nodeDescriptions[presetName];
        if (info) {
            document.getElementById('selectedNodeTitle').innerText = info.title;
            document.getElementById('selectedNodeDesc').innerText = info.desc;
        }
    }
    
    inspectNode(presetName, nodeId) {
        const defaultMsg = document.getElementById('inspector-default-msg');
        const detailsCard = document.getElementById('inspector-details');
        
        if (!defaultMsg || !detailsCard) return;
        
        // Find node detail
        const presetDetails = this.nodeDetails[presetName];
        const visualNode = (this.nodeLayouts[presetName] || []).find(n => n.id === nodeId);
        const nodeDetail = presetDetails && presetDetails[nodeId]
            ? presetDetails[nodeId]
            : this.buildFallbackNodeDetail(visualNode);
        
        if (nodeDetail) {
            defaultMsg.style.display = 'none';
            detailsCard.style.display = 'flex';
            
            // Find actual visual node to read its title
            const nodeTitle = visualNode ? visualNode.title : nodeId;
            
            document.getElementById('insNodeType').innerText = nodeDetail.type || 'Material Expression';
            document.getElementById('insNodeTitle').innerText = nodeTitle;
            document.getElementById('insRoleText').innerText = nodeDetail.role;
            document.getElementById('insWhyText').innerText = nodeDetail.why;
            document.getElementById('insEffectsText').innerText = nodeDetail.effects;
            const docLinks = document.getElementById('insDocLinks');
            if (docLinks) {
                docLinks.innerHTML = this.getOfficialDocLinksForNode(nodeTitle, nodeDetail);
            }
        } else {
            this.clearInspector();
        }
    }

    buildFallbackNodeDetail(visualNode) {
        if (!visualNode) return null;

        const title = visualNode.title;
        const normalized = title.toLowerCase();
        const outputPins = visualNode.inPins && visualNode.type === 'output'
            ? visualNode.inPins.join(', ')
            : '';

        if (visualNode.type === 'output') {
            return {
                type: 'MATERIAL OUTPUT',
                role: `최종 계산 결과를 Unreal Material Output의 ${outputPins || '해당'} 입력 핀으로 전달하는 출력 카드입니다.`,
                why: '이 카드는 별도 커스텀 노드가 아니라 실제 머터리얼의 최종 입력 위치를 표시합니다. 프리셋 이름이나 효과 이름이 엔진 노드명이라는 뜻이 아닙니다.',
                effects: 'Emissive, Opacity, Opacity Mask, Normal, BaseColor, World Position Offset 같은 최종 셰이딩 입력 확인에 사용합니다.'
            };
        }

        const catalog = [
            { keys: ['texcoord', 'texture coordinate'], type: 'COORDINATE SOURCE', role: '0~1 UV 좌표를 공급합니다.', why: 'Texture Sample, Panner, Rotator, BumpOffset 같은 좌표 기반 노드의 기준 좌표로 사용됩니다.' },
            { keys: ['panner'], type: 'UV TRANSFORM', role: 'UV + Time * Speed 형태로 텍스처 좌표를 이동시킵니다.', why: '흐르는 불, 연기, 물, 에너지 패턴처럼 일정 방향으로 움직이는 샘플링 좌표를 만들기 위해 사용합니다.' },
            { keys: ['rotator'], type: 'UV TRANSFORM', role: 'UV를 중심점 기준으로 회전시킵니다.', why: '마법진, 포탈, 소용돌이처럼 회전하는 텍스처 흐름을 만들기 위해 사용합니다.' },
            { keys: ['texture sample', 'noise texture', 'height texture'], type: 'TEXTURE SAMPLE', role: '텍스처를 지정 좌표에서 샘플링해 RGB/A 또는 단일 채널 값을 출력합니다.', why: '마스크, 색상, 노말, 높이, 플립북 프레임 등 실제 이미지 데이터를 그래프에 공급합니다.' },
            { keys: ['constant3vector', 'vector parameter'], type: 'VECTOR VALUE', role: 'RGB 색상이나 3D 벡터 값을 제공합니다.', why: '색상, 노말 방향, 라이트 방향, 사용자 조절 벡터 값을 계산에 넣기 위해 사용합니다.' },
            { keys: ['constant', 'scalar parameter'], type: 'SCALAR VALUE', role: '단일 숫자 값을 제공합니다.', why: '강도, 임계값, 속도, 페이드 거리처럼 작업자가 조절해야 하는 수치를 안정적으로 분리합니다.' },
            { keys: ['multiply'], type: 'MATH MULTIPLY', role: 'A와 B를 곱합니다.', why: '마스크와 색상, 강도와 노이즈, 페이드 값과 알파처럼 값의 영향도를 제한하거나 증폭합니다.' },
            { keys: ['add'], type: 'MATH ADD', role: 'A와 B를 더합니다.', why: 'UV 오프셋, 여러 마스크 합성, 글로우 보강처럼 값을 누적할 때 사용합니다.' },
            { keys: ['sine'], type: 'PERIODIC MATH', role: '입력 값을 주기적인 파형으로 변환합니다.', why: '깜빡임, 펄스, 링 파동, 반복 흔들림처럼 시간 기반 반복 신호를 만들기 위해 사용합니다.' },
            { keys: ['step'], type: 'THRESHOLD MATH', role: '입력이 임계값보다 크면 1, 작으면 0 계열의 경계 값을 만듭니다.', why: '카툰 셀 경계, 글리치 순간 신호, 하드 마스크처럼 선명하게 잘리는 결과가 필요할 때 사용합니다.' },
            { keys: ['smoothstep'], type: 'THRESHOLD MATH', role: '임계 구간을 부드럽게 보간한 마스크를 만듭니다.', why: '디졸브, 페이드, 소프트 마스크에서 딱딱한 Step 경계를 완화하기 위해 사용합니다.' },
            { keys: ['depth fade'], type: 'DEPTH MATH', role: '파티클/반투명 표면과 씬 지오메트리의 교차 경계를 부드럽게 만듭니다.', why: '연기, 물, 안개가 바닥과 만날 때 생기는 날카로운 절단선을 줄이기 위해 사용합니다.' },
            { keys: ['bumpoffset'], type: 'PARALLAX UV OFFSET', role: '높이 맵을 기반으로 UV를 시야 방향에 맞게 오프셋합니다.', why: '평면 텍스처에 얕은 깊이감을 부여하되, 결과는 왜곡된 UV로 Texture Sample에 연결해야 합니다.' },
            { keys: ['fresnel'], type: 'VIEW ANGLE MATH', role: '카메라 시선과 표면 노말의 각도 차이로 림 값을 만듭니다.', why: '쉴드, 홀로그램, 외곽 글로우처럼 엣지에 강한 빛을 만들기 위해 사용합니다.' },
            { keys: ['dotproduct'], type: 'VECTOR MATH', role: '두 벡터의 방향 유사도를 계산합니다.', why: '라이트 방향, 뷰 방향, 노말 방향의 관계를 수치화해 조명/마스크 계산에 사용합니다.' },
            { keys: ['componentmask'], type: 'CHANNEL MASK', role: 'RGB/A 또는 UV 채널 중 필요한 성분만 추출합니다.', why: 'Packed Texture, 알파, U/V 축 마스크처럼 특정 채널만 후속 계산에 사용하기 위해 분리합니다.' },
            { keys: ['linearinterpolate', 'lerp'], type: 'MATH LERP', role: 'Alpha 값으로 A와 B 사이를 보간합니다.', why: '색상 그라데이션, 히트 플래시, 마스크 기반 재질 전환처럼 두 값을 섞을 때 사용합니다.' }
        ];

        const match = catalog.find(item => item.keys.some(key => normalized.includes(key)));
        if (match) {
            return {
                type: match.type,
                role: match.role,
                why: match.why,
                effects: '이 설명은 노드명 기반 자동 검증 설명입니다. 공식 문서 링크와 함께 실제 노드 용도를 확인할 수 있습니다.'
            };
        }

        return {
            type: 'MATERIAL EXPRESSION',
            role: `${title} 노드 또는 머터리얼 함수 단계입니다.`,
            why: '프리셋 그래프에서 입력 값을 다음 계산 단계로 넘기는 실무 패턴 요소입니다.',
            effects: '해당 노드명과 연결된 공식 Material Expressions 문서를 함께 확인하세요.'
        };
    }

    getOfficialDocLinksForNode(nodeTitle, nodeDetail) {
        const haystack = `${nodeTitle} ${nodeDetail.type || ''} ${nodeDetail.role || ''} ${nodeDetail.why || ''} ${nodeDetail.effects || ''}`.toLowerCase();
        const matches = this.materialDocLinks.filter(doc => doc.keys.some(key => haystack.includes(key)));
        const unique = matches.length ? matches : [
            { label: 'Unreal Engine Materials', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials' },
            { label: 'Material Expressions Reference', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-material-expressions-reference' }
        ];

        return unique.slice(0, 3).map(doc => `
            <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="epic-doc-link">
                ${doc.label} ↗
            </a>
        `).join('<br>');
    }

    clearInspector() {
        const defaultMsg = document.getElementById('inspector-default-msg');
        const detailsCard = document.getElementById('inspector-details');
        if (defaultMsg && detailsCard) {
            defaultMsg.style.display = 'flex';
            detailsCard.style.display = 'none';
            const docLinks = document.getElementById('insDocLinks');
            if (docLinks) docLinks.innerHTML = '...';
        }
    }

    processPrompt(queryText) {
        if (!queryText) return;
        const text = queryText.toLowerCase().trim();
        const feedback = document.getElementById('nodePromptFeedback');
        if (!feedback) return;
        
        // Apply styling class
        feedback.className = 'console-feedback-area';
        
        // CATEGORY 1: General Node Questions (이론 학습형 질문)
        if (text.includes('역할') || text.includes('무엇') || text.includes('설명') || text.includes('왜') || text.includes('의미') || text.includes('?')) {
            if (text.includes('panner') || text.includes('패너') || text.includes('속도')) {
                feedback.innerHTML = `🎓 <strong>Technical Note:</strong> Panner 노드는 머터리얼의 UV 좌표계를 시간(Time)에 비례해 일정한 스피드로 흐르게 만드는 핵심 수학 연산 노드입니다. <br><br>지면 마법진 회전, 칼날 위를 스크롤하는 발광 에너지 오라, 상승하는 불꽃 무늬 등을 연출할 때 자주 쓰입니다. 성능 면에서는 단순한 UV 연산이므로 오버헤드가 거의 없습니다.`;
                feedback.classList.add('info');
                return;
            }
            if (text.includes('depth') || text.includes('fade') || text.includes('뎁스') || text.includes('페이드')) {
                feedback.innerHTML = `🎓 <strong>Technical Note:</strong> Depth Fade 노드는 반투명(Translucent) 오브젝트가 월드의 지형이나 불투명 오브젝트에 닿을 때, 그 경계선에서 생기는 거친 칼각 현상을 카메라 깊이 기준으로 부드럽게 완화하는 셰이더 함수입니다. <br><br>안개, 피웅덩이 경계선, 잔잔한 수면 파도 가장자리에 자주 활용됩니다.`;
                feedback.classList.add('info');
                return;
            }
            if (text.includes('fresnel') || text.includes('프레넬') || text.includes('외곽')) {
                feedback.innerHTML = `🎓 <strong>Technical Note:</strong> Fresnel 노드는 카메라 뷰 벡터와 표면 노말 벡터 사이의 각도를 이용해 시선이 비스듬해지는 외곽선(Rim) 부위에 발광 하이라이트를 집중시키는 셰이딩 공식입니다. <br><br>쉴드, 홀로그램, 네온 외곽 아웃라인, 피격 발광막에 널리 쓰입니다.`;
                feedback.classList.add('info');
                return;
            }
            if (text.includes('multiply') || text.includes('곱하기') || text.includes('멀티플라이')) {
                feedback.innerHTML = `🎓 <strong>Technical Note:</strong> Multiply 노드는 두 인풋 값을 산술 곱셈하는 연산입니다. 머터리얼 그래픽스에서는 이미지 알파 맵끼리 곱해 오버랩 마스크를 잡거나, 특정 발광 색상에 고강도 숫자(예: 50~100)를 곱해 고휘도 Emissive Bloom을 만들 때 주로 활용됩니다.`;
                feedback.classList.add('info');
                return;
            }
            if (text.includes('constant') || text.includes('상수') || text.includes('벡터')) {
                feedback.innerHTML = `🎓 <strong>Technical Note:</strong> Constant(상수) 노드는 고정된 수치나 다차원 벡터를 전달하여 밝기 세기나 RGB 색상을 선언하는 노드입니다. 1D Constant는 강도 조절에, Constant3Vector는 셰이더의 Emissive Color 톤 지정에 사용됩니다.`;
                feedback.classList.add('info');
                return;
            }
        }
        
        // CATEGORY 2: Parameter Modification (파라미터 수치 변경 명령어)
        let numMatch = text.match(/(-?\d+(\.\d+)?)/);
        if (numMatch) {
            const value = parseFloat(numMatch[0]);
            
            // 2.1 Panner Speed modifications
            if (text.includes('panner') || text.includes('패너') || text.includes('속도') || text.includes('스피드') || text.includes('speed')) {
                let axis = 'Y';
                if (text.includes('x축') || text.includes('x축') || text.includes('horizontal') || text.includes('x-')) {
                    axis = 'X';
                }
                
                this.updatePannerSpeed(this.currentPreset, axis, value);
                
                feedback.innerHTML = `🧬 <strong>AI 노드 엔진 가동:</strong> ${this.currentPreset.toUpperCase()} 프리셋의 <strong>Panner Speed${axis}</strong> 파라미터를 <code>${value}</code>(으)로 동적으로 갱신하고, 언리얼 복사용 클립보드 블록과 노드 맵 레이아웃 카드를 실시간 갱신 완료하였습니다! <br><br>💡 <strong>Unreal 복사 팁:</strong> 하단의 'Unreal Engine 노드 복사' 버튼을 눌러 에디터에 붙여넣어 보세요.`;
                feedback.classList.add('success');
                return;
            }
            
            // 2.2 Constant Value / Intensity modifications
            if (text.includes('발광') || text.includes('강도') || text.includes('세기') || text.includes('상수') || text.includes('constant') || text.includes('값') || text.includes('intensity')) {
                this.updateConstantValue(this.currentPreset, value);
                
                feedback.innerHTML = `🧬 <strong>AI 노드 엔진 가동:</strong> ${this.currentPreset.toUpperCase()} 프리셋의 발광용 <strong>Constant Value</strong> 파라미터를 <code>${value}</code>(으)로 동적으로 부스트하고, 클립보드 블록의 상응 상수를 갱신 완료하였습니다!`;
                feedback.classList.add('success');
                return;
            }
        }
        
        // CATEGORY 3: Structural Modification (구조적 노드 추가/조합 명령어)
        // 3.1 Screen Distortion/Refraction addition
        if (text.includes('왜곡') || text.includes('굴절') || text.includes('디스토션') || text.includes('refraction') || text.includes('distortion')) {
            const added = this.addNodeToPreset(this.currentPreset, 'distortion');
            if (added) {
                feedback.innerHTML = `🧬 <strong>AI 노드 엔진 가동: ${this.currentPreset.toUpperCase()} 셰이더에 대기 굴절 왜곡(Distortion/Refraction) 회로를 성공적으로 합성했습니다!</strong><br><br>
                <strong>[추가된 노드 목록]:</strong><br>
                - <strong>Panner (SpeedY: -0.3)</strong>: 대기 왜곡 노말 문양이 위로 스크롤되도록 제어합니다.<br>
                - <strong>Normal Texture</strong>: 화면을 아지랑이처럼 일렁이게 만들 바람 패턴의 물리 법선 정보를 공급합니다.<br>
                - <strong>Constant (0.05)</strong>: 굴절율을 5% 세기로 스케일링해 화면이 과하게 깨지지 않게 보정합니다.<br>
                - <strong>Refraction Result</strong>: 최종 셰이더 파이프라인의 굴절(Refraction) 핀으로 수식을 완결 짓습니다.<br><br>
                💡 <strong>VFX 설계 Rationale:</strong> 칼날 궤적이나 화염 주변의 대기가 일렁이는 아지랑이(왜곡) 효과는 이펙트의 입체감과 속도감을 AAA급 콘솔 수준으로 올리는 필수 실무 공식입니다. 이제 'Unreal Engine 노드 복사' 버튼을 눌러 에디터에 적용해 보세요!`;
                feedback.classList.add('success');
            } else {
                feedback.innerHTML = `⚠️ <strong>안내:</strong> 현재 프리셋에는 이미 화면 굴절 왜곡(Distortion/Refraction) 회로가 구성되어 활성화되어 있습니다.`;
                feedback.classList.add('info');
            }
            return;
        }

        // 3.2 Depth Fade node addition
        if (text.includes('depth') || text.includes('fade') || text.includes('뎁스') || text.includes('페이드')) {
            const added = this.addNodeToPreset(this.currentPreset, 'depthfade');
            if (added) {
                feedback.innerHTML = `🧬 <strong>AI 노드 엔진 가동:</strong> 바닥 가장자리의 투명도 경계 완화를 위한 <strong>Depth Fade (FadeDistance: 200.0)</strong> 노드를 그래프 우측 하단에 물리적으로 생성하고 와이어링 선을 실시간으로 설계 완료하였습니다! <br><br><strong>언리얼 셰이더 클립보드에 Depth Fade 수식이 추가되었습니다.</strong>`;
                feedback.classList.add('success');
            } else {
                feedback.innerHTML = `⚠️ <strong>안내:</strong> 현재 프리셋에는 이미 Depth Fade 노드가 구성되어 활성화되어 있거나, 추가할 수 있는 공간이 부족합니다.`;
                feedback.classList.add('info');
            }
            return;
        }
        
        // 3.2 Fresnel node addition
        if (text.includes('fresnel') || text.includes('프레넬')) {
            const added = this.addNodeToPreset(this.currentPreset, 'fresnel');
            if (added) {
                feedback.innerHTML = `🧬 <strong>AI 노드 엔진 가동:</strong> 캐릭터/오브젝트의 림라이트 하이라이트 외곽 발광을 위한 <strong>Fresnel (Exponent: 5.0)</strong> 노드를 그래프 중심에 추가하고 실시간 셰이더 블록을 합성 생성하였습니다!`;
                feedback.classList.add('success');
            } else {
                feedback.innerHTML = `⚠️ <strong>안내:</strong> 현재 프리셋에는 이미 Fresnel 노드가 구성되어 활성화되어 있습니다.`;
                feedback.classList.add('info');
            }
            return;
        }
        
        // Fallback
        feedback.innerHTML = `🎓 <strong>Technical Note:</strong> 입력하신 <em>"${queryText}"</em> 명령어는 유효하지만, 현재 셰이더 레이아웃에서는 노말 패닝이나 발광 곱셈 세부 수치 조절(예: <code>속도 Y축을 -2로 지정</code> 또는 <code>발광 세기를 100으로 상향</code>) 혹은 <code>Depth Fade 노드 추가</code>와 같은 구체적인 지시가 가장 알맞습니다.`;
        feedback.classList.add('error');
    }

    updatePannerSpeed(preset, axis, value) {
        // Update visual node title
        const layouts = this.nodeLayouts[preset] || [];
        const pannerNode = layouts.find(n => n.title.includes('Panner') || n.id === 'n2' || n.id === 'n3' || n.id === 'n11');
        if (pannerNode) {
            pannerNode.title = `Panner (Speed${axis}: ${value})`;
        }
        
        // Update copy text
        let copyBlock = this.unrealCopyTexts[preset];
        if (copyBlock) {
            const formattedValue = value.toFixed(6);
            const regex = new RegExp(`Speed${axis}=-?\\d+\\.\\d+`, 'g');
            if (copyBlock.match(regex)) {
                copyBlock = copyBlock.replace(regex, `Speed${axis}=${formattedValue}`);
            } else {
                // If not found, insert inside MaterialExpressionPanner block before its End Object
                const pannerMatch = copyBlock.indexOf('MaterialExpressionPanner');
                if (pannerMatch !== -1) {
                    const endObjectMatch = copyBlock.indexOf('End Object', pannerMatch);
                    if (endObjectMatch !== -1) {
                        copyBlock = copyBlock.substring(0, endObjectMatch) + `    Speed${axis}=${formattedValue}\n` + copyBlock.substring(endObjectMatch);
                    }
                }
            }
            this.unrealCopyTexts[preset] = copyBlock;
        }
        
        // Re-render
        this.renderGraph(preset);
    }

    updateConstantValue(preset, value) {
        // Update visual node title
        const layouts = this.nodeLayouts[preset] || [];
        const constNode = layouts.find(n => n.title.includes('Constant') || n.type === 'const');
        if (constNode) {
            constNode.title = `Constant (${value})`;
        }
        
        // Update copy text
        let copyBlock = this.unrealCopyTexts[preset];
        if (copyBlock) {
            const formattedValue = value.toFixed(6);
            // Replace R=... inside MaterialExpressionConstant
            const regex = /R=-?\d+\.\d+/g;
            if (copyBlock.match(regex)) {
                copyBlock = copyBlock.replace(regex, `R=${formattedValue}`);
            }
            this.unrealCopyTexts[preset] = copyBlock;
        }
        
        // Re-render
        this.renderGraph(preset);
    }

    addNodeToPreset(preset, nodeType) {
        const layouts = this.nodeLayouts[preset] || [];
        
        if (nodeType === 'distortion') {
            const hasNode = layouts.some(n => n.id === 'n_dist_pan');
            if (hasNode) return false;
            
            // Try to find an existing TexCoord node
            let tcNode = layouts.find(n => n.title.includes('TexCoord'));
            let tcId = tcNode ? tcNode.id : 'n_dist_tc';
            if (!tcNode) {
                layouts.push({
                    id: 'n_dist_tc',
                    title: 'TexCoord (Added)',
                    type: 'input',
                    x: 32,
                    y: 380,
                    outPins: ['UV']
                });
            }
            
            // Add Panner, Normal Texture, Constant (0.05), Multiply, and Refraction nodes with spacious layout!
            layouts.push({
                id: 'n_dist_pan',
                title: 'Panner (SpeedY: -0.3)',
                type: 'math',
                x: 280,
                y: 380,
                inPins: ['Coordinate'],
                outPins: ['UV']
            });
            
            layouts.push({
                id: 'n_dist_tex',
                title: 'Texture Sample (Normal)',
                type: 'math',
                x: 520,
                y: 380,
                inPins: ['UV'],
                outPins: ['RGB']
            });
            
            layouts.push({
                id: 'n_dist_const',
                title: 'Constant (0.05)',
                type: 'const',
                x: 520,
                y: 550,
                outPins: ['Value']
            });
            
            layouts.push({
                id: 'n_dist_mult',
                title: 'Multiply',
                type: 'math',
                x: 760,
                y: 400,
                inPins: ['A', 'B'],
                outPins: ['Out']
            });
            
            layouts.push({
                id: 'n_dist_ref',
                title: 'Material Output',
                type: 'output',
                x: 1000,
                y: 410,
                inPins: ['Refraction'],
                outPins: []
            });
            
            // Draw wires
            const wires = this.nodeWires[preset] || [];
            wires.push({
                from: tcId,
                fromPin: 'UV',
                to: 'n_dist_pan',
                toPin: 'Coordinate'
            });
            wires.push({
                from: 'n_dist_pan',
                fromPin: 'UV',
                to: 'n_dist_tex',
                toPin: 'UV'
            });
            wires.push({
                from: 'n_dist_tex',
                fromPin: 'RGB',
                to: 'n_dist_mult',
                toPin: 'A'
            });
            wires.push({
                from: 'n_dist_const',
                fromPin: 'Value',
                to: 'n_dist_mult',
                toPin: 'B'
            });
            wires.push({
                from: 'n_dist_mult',
                fromPin: 'Out',
                to: 'n_dist_ref',
                toPin: 'Refraction'
            });
            
            // Register detailed inspector DB entries for all 5 new nodes dynamically
            if (!this.nodeDetails[preset]) {
                this.nodeDetails[preset] = {};
            }
            
            this.nodeDetails[preset]['n_dist_pan'] = {
                type: 'PANNER MATH',
                role: '왜곡 노말 텍스처 좌표 패닝 스크롤 제어 노드',
                why: '지정된 속도 벡터(SpeedY: -0.3)로 노말 무늬를 흘려보내 대기 왜곡에 운동성을 가하기 위해 연결합니다.',
                effects: '타격 충격파 왜곡, 캐릭터 칼날 림라이트 일렁임'
            };
            this.nodeDetails[preset]['n_dist_tex'] = {
                type: 'TEXTURE SAMPLE',
                role: '대기 굴절용 일렁이는 바람 노말 벡터 텍스처',
                why: '바람 패턴 법선 벡터를 추출해 픽셀 왜곡 굴절 좌표의 원동력을 공급하기 위해 연결합니다.',
                effects: '물결 굴절 왜곡, 폭발 아지랑이'
            };
            this.nodeDetails[preset]['n_dist_const'] = {
                type: 'CONSTANT SCALER',
                role: '왜곡 강도 비율 조절용 상수(0.05)',
                why: '화면이 기괴하게 찢어지거나 렌더링 에러가 나지 않도록 왜곡 강도를 미세 세기(5%)로 조절하기 위해 곱합니다.',
                effects: '포화 굴절 방지, 고화질 셰이딩'
            };
            this.nodeDetails[preset]['n_dist_mult'] = {
                type: 'MULTIPLY MATH',
                role: '노말 굴절 오프셋과 감쇄 상수의 산술 곱연산',
                why: '강도 보정이 완료된 대기 왜곡 신호 벡터를 최종 화면 굴절 출력 핀에 인도하기 위해 연결합니다.',
                effects: '검기 궤적 디스토션 완성'
            };
            this.nodeDetails[preset]['n_dist_ref'] = {
                type: 'FINAL OUTPUT',
                role: '최종 Refraction 화면 굴절 출력 핀',
                why: '머터리얼 최종 굴절(Refraction) 입력 핀에 연결하여 오브젝트 뒤편의 월드 배경을 물리적으로 비틀어 연출합니다.',
                effects: '초고속 검기 궤적 엣지, 배기구 고열 아지랑이'
            };
            if (tcId === 'n_dist_tc') {
                this.nodeDetails[preset]['n_dist_tc'] = {
                    type: 'INPUT COORDINATE',
                    role: '왜곡 Panner 구동을 위해 추가된 기본 UV 좌표',
                    why: '기존 머터리얼에 좌표 노드가 없는 곳에 왜곡을 안전하게 덧대기 위해 좌표계를 동적 생성하였습니다.',
                    effects: 'UV 오프셋 좌표계 기틀'
                };
            }
            
            // Update copy text
            this.unrealCopyTexts[preset] += `\nBegin Object Class=/Script/Engine.MaterialExpressionPanner Name="MaterialExpressionPanner_DistortionAdded"
    SpeedY=-0.300000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_DistortionAdded"
    Coordinate=(Expression=MaterialExpressionPanner'"MaterialExpressionPanner_DistortionAdded"')
    SamplerType=SAMPLERTYPE_Normal
End Object
Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_DistortionAdded"
    R=0.050000
End Object
Begin Object Class=/Script/Engine.MaterialExpressionMultiply Name="MaterialExpressionMultiply_DistortionAdded"
    A=(Expression=MaterialExpressionTextureSample'"MaterialExpressionTextureSample_DistortionAdded"',OutputIndex=1)
    B=(Expression=MaterialExpressionConstant'"MaterialExpressionConstant_DistortionAdded"')
End Object`;
            
            this.renderGraph(preset);
            return true;
        }

        if (nodeType === 'depthfade') {
            const hasNode = layouts.some(n => n.id === 'n_depthfade');
            if (hasNode) return false;
            
            // Add Depth Fade visual card (Spaciously positioned!)
            layouts.push({
                id: 'n_depthfade',
                title: 'Depth Fade (200)',
                type: 'math',
                x: 760,
                y: 280,
                inPins: ['FadeDistance'],
                outPins: ['Out']
            });
            
            // Add wire link to output
            const wires = this.nodeWires[preset] || [];
            wires.push({
                from: 'n_depthfade',
                fromPin: 'Out',
                to: 'n6',
                toPin: 'B'
            });
            
            // Register details database entry dynamically
            this.nodeDetails[preset]['n_depthfade'] = {
                type: 'DEPTH FADE MATH',
                role: '반투명 가장자리 바닥 완충 계산 노드',
                why: '파티클이 불투명 지형과 오버랩되는 칼각 현상을 제거하기 위해 중심 출력에 연동합니다.',
                effects: '부드러운 대기 가스 안개, 수면 물결 가장자리'
            };
            
            // Update copy block
            this.unrealCopyTexts[preset] += `\nBegin Object Class=/Script/Engine.MaterialExpressionDepthFade Name="MaterialExpressionDepthFade_Added"
    FadeDistance=200.000000
End Object`;
            
            this.renderGraph(preset);
            return true;
        }
        
        if (nodeType === 'fresnel') {
            const hasNode = layouts.some(n => n.id === 'n_fresnel');
            if (hasNode) return false;
            
            // Add Fresnel visual card (Spaciously positioned!)
            layouts.push({
                id: 'n_fresnel',
                title: 'Fresnel (Exponent: 5)',
                type: 'math',
                x: 540,
                y: 280,
                inPins: ['Exponent'],
                outPins: ['Out']
            });
            
            // Add wire link
            const wires = this.nodeWires[preset] || [];
            wires.push({
                from: 'n_fresnel',
                fromPin: 'Out',
                to: 'n6',
                toPin: 'A'
            });
            
            // Register details
            this.nodeDetails[preset]['n_fresnel'] = {
                type: 'FRESNEL GLOW MATH',
                role: '뷰 각도 비례 림라이트 외곽 발광 추출 노드',
                why: '카메라가 보는 각도에 비례해 주변 림 부위를 부드럽고 강렬하게 살려주기 위해 멀티플라이 부스터로 연결합니다.',
                effects: '마법 결정 에너지막, 보호막 외곽 아웃라인, 피격 하이라이트'
            };
            
            // Update copy block
            this.unrealCopyTexts[preset] += `\nBegin Object Class=/Script/Engine.MaterialExpressionFresnel Name="MaterialExpressionFresnel_Added"
    Exponent=5.000000
End Object`;
            
            this.renderGraph(preset);
            return true;
        }
        
        return false;
    }
    
    copyToClipboard() {
        const text = this.unrealCopyTexts[this.currentPreset];
        if (!text) return;
        
        navigator.clipboard.writeText(text).then(() => {
            const alertBox = document.getElementById('copyAlert');
            if (alertBox) {
                alertBox.classList.add('show');
                setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            }
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
        });
    }

    // ==========================================
    // [NEW] Middle-Click Drag to Pan & Wheel Scroll to Zoom Engine
    // ==========================================
    initPanZoom() {
        setTimeout(() => {
            const viewport = document.querySelector('.node-graph-viewport');
            const container = document.getElementById('nodeGraphContainer');
            if (!viewport || !container) return;
            
            this.zoom = 1.0;
            this.panX = 20;
            this.panY = 20;
            this.isDragging = false;
            this.startX = 0;
            this.startY = 0;
            
            const updateTransform = () => {
                container.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
                container.style.transformOrigin = '0 0';
                this.redrawWires();
            };
            
            // 1. Wheel click (Middle button, e.button === 1) to Drag Pan
            viewport.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                    this.isDragging = true;
                    viewport.style.cursor = 'grabbing';
                    this.startX = e.clientX - this.panX;
                    this.startY = e.clientY - this.panY;
                }
            });
            
            window.addEventListener('mousemove', (e) => {
                if (this.isDragging) {
                    this.panX = e.clientX - this.startX;
                    this.panY = e.clientY - this.startY;
                    updateTransform();
                }
            });
            
            window.addEventListener('mouseup', (e) => {
                if (this.isDragging && e.button === 1) {
                    this.isDragging = false;
                    viewport.style.cursor = 'default';
                }
            });
            
            viewport.addEventListener('click', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                }
            });
            
            // 2. Wheel Scroll to Zoom towards Mouse Position
            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                
                const zoomIntensity = 0.04;
                const rect = viewport.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const containerX = (mouseX - this.panX) / this.zoom;
                const containerY = (mouseY - this.panY) / this.zoom;
                
                if (e.deltaY < 0) {
                    this.zoom = Math.min(this.zoom + zoomIntensity, 1.8);
                } else {
                    this.zoom = Math.max(this.zoom - zoomIntensity, 0.45);
                }
                
                this.panX = mouseX - containerX * this.zoom;
                this.panY = mouseY - containerY * this.zoom;
                
                updateTransform();
            }, { passive: false });

            updateTransform();
        }, 100);
    }
    
    resetPanZoom() {
        this.zoom = 1.0;
        this.panX = 20;
        this.panY = 20;
        const container = document.getElementById('nodeGraphContainer');
        if (container) {
            container.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
            container.style.transformOrigin = '0 0';
        }
    }
    
    redrawWires() {
        const presetName = this.currentPreset;
        const container = document.getElementById('nodeGraphContainer');
        const svg = container ? container.querySelector('.wires-svg') : null;
        if (!container || !svg) return;
        
        svg.innerHTML = '';
        
        const wires = this.nodeWires[presetName] || [];
        const viewRect = container.getBoundingClientRect();
        
        wires.forEach(wire => {
            const outPin = document.getElementById(`pin-out-${wire.from}-${wire.fromPin}`);
            const inPin = document.getElementById(`pin-in-${wire.to}-${wire.toPin}`);
            
            if (outPin && inPin) {
                const outRect = outPin.querySelector('.pin-dot').getBoundingClientRect();
                const inRect = inPin.querySelector('.pin-dot').getBoundingClientRect();
                
                const x1 = (outRect.left + outRect.width/2 - viewRect.left) / this.zoom;
                const y1 = (outRect.top + outRect.height/2 - viewRect.top) / this.zoom;
                const x2 = (inRect.left + inRect.width/2 - viewRect.left) / this.zoom;
                const y2 = (inRect.top + inRect.height/2 - viewRect.top) / this.zoom;
                
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const offset = Math.abs(x2 - x1) * 0.5;
                const d = `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
                
                path.setAttribute('d', d);
                path.setAttribute('class', 'wire-path glowing');
                svg.appendChild(path);
            }
        });
    }
}
