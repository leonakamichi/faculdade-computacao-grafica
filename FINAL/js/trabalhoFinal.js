var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

var parametrosGUI = {};
var animationFolder;

var elementos = [];

var velocidade = 0.07;

var geometriaA;

var lights =[];

var wolfVelocity = 0;

//variaveis para animação
var mixer;
var modelReady = false;
var animationActions = Array();
var activeAction;
var lastAction;
var loadFinished;

var clock = new THREE.Clock();

var objLoading = function(){
	loaderFBX = new THREE.FBXLoader();

	//Load da pista
	loaderFBX.load(
		'assets/pista/racetrackwithassets.fbx',
		function(obj){
			elementos['pista'] = obj;
			let texLoader = new THREE.TextureLoader().setPath("assets/pista/");

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
                        child.material = new THREE.MeshLambertMaterial({
							map: texLoader.load("DefaultMaterial_Base_Color.png"),
                        });

                        child.material.aoMap = texLoader.load("DefaultMaterial_Mixed_AO.png");
                        child.material.normalMap = texLoader.load("DefaultMaterial_Normal_OpenGL.png");

                        child.material.roughnessMap = texLoader.load("DefaultMaterial_Roughness.png");
                        child.material.roughnessMap.wrapS = THREE.RepeatWrapping;

                        child.material.metalnessMap = texLoader.load("DefaultMaterial_Metallic.png");
                        child.material.metalnessMap.wrapS = THREE.RepeatWrapping;
					}
				}
			);

			 obj.scale.y = 0.05;
			 obj.scale.z = 0.05;
			 obj.scale.x = 0.05;

			obj.position.y = -7.5;

			scene.add(obj);
			console.log("Carregou Pista");
			loadFinished = true;

		});

		//Load do carro 
		loaderFBX.load(
			'assets/carro/Models/car_1.fbx',
			function(obj){
				elementos['carro_policia'] = obj;
				let texLoader = new THREE.TextureLoader().setPath("assets/carro/Textures/");
	
				obj.traverse( function (child){
						if (child instanceof THREE.Mesh){
							child.material = new THREE.MeshLambertMaterial({
								map: texLoader.load("CarTexture1.png"),
							});
						}
					}
				);
	
				 obj.scale.y = 1;
				 obj.scale.z = 1;
				 obj.scale.x = 1;
	
				obj.position.y = -5.6;
				obj.position.x = -16;
				obj.position.z = -15;
				
				obj.rotation.x += 1.6;
				obj.rotation.z -= 1.6;

				scene.add(obj);
				console.log("Carregou Carro 1");
				loadFinished = true;
	
			});
};
//troca a ação do nosso modelo
// const setAction = function(toAction) {
//     if (toAction != activeAction) {
//         lastAction = activeAction;
//         activeAction = toAction;
//         lastAction.stop();
//         activeAction.reset();
//         activeAction.play();
//     }
// }

var ambientLightOn = function (){
	lights['ambient'] = new THREE.AmbientLight(0xffffff,0.5);
	scene.add(lights['ambient']);
}

// var hemisphereLightOn = function(){
// 	lights['hemisphere'] = new THREE.HemisphereLight(0xcce0ff, 0xffffff, 1);
// 	scene.add(lights['hemisphere']);
// }

// var directionalLightOn = function () {
// 	let light = new THREE.DirectionalLight(0xffffff,1);
// 	light.castShadow = true;
// 	light.shadow.mapSize.width = 4096;
//     light.shadow.mapSize.height = 4096;
//     light.shadow.camera.left = 1000;
//     light.shadow.camera.bottom = 1000;
//     light.shadow.camera.right = -1000
//     light.shadow.camera.top = -1000;

// 	light.position.y = 200;
// 	light.position.x = 100;
// 	light.target = elementos['pista'];


// 	scene.add(light);
// 	scene.add(light.target)

// 	lights['directional'] = light;
// }

// var spotLightOn = function(){
// 	let spot = new THREE.SpotLight(0xffffff, 0);
// 	spot.angle = 0.3;
// 	spot.castShadow = true;

// 	spot.position.z = 40;
// 	spot.position.y = 15;

// 	spot.shadow.distance = 20;
// 	spot.shadow.penumbra = 30;
// 	spot.shadow.angle = 25;
	
// 	spot.target.position.set(0,5,0);

// 	lights['spot'] = spot;
// 	scene.add(spot);
// }

// var pointLightOn = function (){
// 	let point = new THREE.PointLight(0xffffff, 3, 200);
// 	lights['point'] = point;
// 	point.castShadow = true;
// 	point.position.y=10;
// 	point.position.z = 10;

// 	scene.add(point);
// }

var godSaysLightsOn = function (){
	//hemisphereLightOn();
	//directionalLightOn();
	//spotLightOn();
	//pointLightOn();
	ambientLightOn();
}


var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalarPista: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		ambientLight: 1,
		sunLight: 1,

		skyColor : "#000000",

		elementos: "",
	};

	let fazScala = gui.add(parametrosGUI, 'scalarPista').min(0).max(0.10).step(0.01).name("Scale");
	fazScala.onChange(function (parametro){
			elementos[parametrosGUI.modelGui].scale.x = parametro;
			elementos[parametrosGUI.modelGui].scale.y = parametro;
			elementos[parametrosGUI.modelGui].scale.z = parametro;
		}
	);

	let intensidadeLuz = gui.add(parametrosGUI, 'ambientLight').min(0).max(2).step(0.1).name("Ambient Light");
	intensidadeLuz.onChange(function (parametro){
			lights['ambient'].intensity = parametro;
		}
	);

	let sunLight = gui.add(parametrosGUI, 'sunLight').min(0).max(2).step(0.1).name("Sun Light");
	sunLight.onChange(function (parametro){
			lights['directional'].intensity = parametro;
		}
	);


	let opcoes = ['pista'];
	let comboChange = gui.add(parametrosGUI, 'elementos').options(opcoes).name("Elementos");
	comboChange.onChange(function(parametro){
			if (parametro == 'pista'){
				camera.lookAt(elementos["pista"].position);
				parametrosGUI.modelGui = "pista";
			}
		}
	);
	let folderPosition = gui.addFolder("Position");

	let positionX = folderPosition.add(parametrosGUI, 'positionX').min(0).max(600).step(15).name("Position X");
	positionX.onChange(function (parametro){
		lights['directional'].position.x = parametro;
		}
	);
	let positionY = folderPosition.add(parametrosGUI, 'positionY').min(0).max(600).step(15).name("Position Y");
	positionY.onChange(function (parametro){
		lights['directional'].position.y = parametro;
		}
	);
	let positionZ = folderPosition.add(parametrosGUI, 'positionZ').min(0).max(600).step(15).name("Position Z");
	positionZ.onChange(function (parametro){
			lights['directional'].position.z = parametro;
		}
	);

	let colorFolder = gui.addFolder('Coloros');
	let sColor = colorFolder.addColor(parametrosGUI, 'skyColor').name("SkyColor");
	sColor.onChange(function (parametro){
			scene.background= new THREE.Color(parametro);
		}
	);

	animationFolder = gui.addFolder('Animations');
    
	gui.open();

}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						500 //far
					);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;
	
	createGui();

	objLoading();

	animation();

	godSaysLightsOn();

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog = new THREE.Fog(0xcce0ff, 100, 500);


	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

};



var key_r = false;
var key_space = false;
var key_q = false;

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		key_q = false;
	}
}


var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 82){ //r
		elementos['cerberus'].rotation.x+=0.1;
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
		pulando = true;
		if (lights['spot'].intensity == 0) 
			lights['spot'].intensity = 1;
		else
			lights['spot'].intensity = 0;
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}

	if (e.keyCode == 38){ //douwn
		camera.position.z-=0.5;
		//elementos["puppet"]["tronco"].position.z += 1;
	}
	if (e.keyCode == 40){ // UP
		//elementos["puppet"]["tronco"].position.z -= 1;
		camera.position.z+=0.5;
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var animation = function (){
	requestAnimationFrame(animation); 

	
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init