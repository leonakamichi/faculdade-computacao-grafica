var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouse
//google-chrome --allow-file-access-from-files


var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var ground;
var geometriaA;

var fbxLoading = function() {
	loaderPlanta = new THREE.FBXLoader();
	loaderPlanta.load(
		'assets/carro/Models/car_1.fbx',
		function(obj) {
			
			elementos['carro'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/carro/Textures/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("CarTexture1.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 8; 
			obj.scale.z = 8;
			obj.scale.x = 8;

            obj.position.x = 0;
			obj.position.y = -5;
			obj.position.z = 300;

			obj.rotation.x -= 4.7;
			obj.rotation.z += 1.6;

			scene.add(obj);
			console.log("Carregou Carro !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);
};

var godSaysLightsOn = function() {
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100, 100, 100);
	scene.add(spot);

	scene.add(new THREE.HemisphereLight( 0x443333, 0x222233, 4));
};

var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		rotationY: 0,

		carColor : "#000000",
		groundColor: "#006400",

		carro: "",
		modelGUI: ""
	};

	let opcoes = ['Carro'];
	let comboChange = gui.add(parametrosGUI, 'carro').options(opcoes).name("Carro");
	comboChange.onChange(function(parametro){
			if (parametro == 'Carro'){
				camera.lookAt(elementos["carro"].position);
				parametrosGUI.modelGUI = "carro";
			}
		}
	);

	let folderPosition = gui.addFolder("Position");

	let positionX = folderPosition.add(parametrosGUI, 'positionX').min(-30).max(30).step(0.1).name("Position X");
	    positionX.onChange(function (parametro){
		    elementos[parametrosGUI.modelGUI].position.x = parametro;
		}
	);
	let positionY = folderPosition.add(parametrosGUI, 'positionY').min(-10).max(10).step(0.1).name("Position Y");
	    positionY.onChange(function (parametro){
			elementos[parametrosGUI.modelGUI].position.y = parametro;
		}
	);
	let positionZ = folderPosition.add(parametrosGUI, 'positionZ').min(-25).max(25).step(0.1).name("Position Z");
	    positionZ.onChange(function (parametro){
		    elementos[parametrosGUI.modelGUI].position.z = parametro;
		}
	);

	let folderRotation = gui.addFolder("Rotation");

	let rotationY = folderRotation.add(parametrosGUI, 'rotationY').min(-1).max(1).step(0.1).name("Rotation Y");
		rotationY.onChange(function (parametro){
			elementos[parametrosGUI.modelGUI].rotation.y += parametro;
		}
	);	

	let colorFolder = gui.addFolder('Coloros');
	let aColor = colorFolder.addColor(parametrosGUI, 'carColor').name("Car Color");
	aColor.onChange(function (parametro){
			elementos[parametrosGUI.modelGUI].traverse(function(child) {
				if(child.isMesh) {
						child.material.color = new THREE.Color(parametro);
				} 
			});
	});

	let gColor = colorFolder.addColor(parametrosGUI, 'groundColor').name("Ground");
	    gColor.onChange(function (parametro){
			ground.material.color.setHex(parametro.replace("#", "0x"));
		}
	);

	gui.open();
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff)
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						800 //far
					);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 400;
	camera.position.x = 0;
	camera.position.y = 50;

	godSaysLightsOn();
	
	createGui();

	fbxLoading();

	animation();


	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/asfalto/Road007_2K_Color.jpg"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(1, 1); //número de vezes que ela vai se repetir dentro do nosso chão

	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/asfalto/Road007_2K_Normal.jpg"); //busca a normal, que dá noção de profundidade
	materialGround.roughnessMap = textureLoad.load("assets/asfalto/Road007_2K_Roughness.jpg");
	materialGround.displacementMap = textureLoad.load("assets/asfalto/Road007_2K_Displacement.jpg");
	materialGround.displacementScale = 1;
	materialGround.displacementBias = 1;

	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(100, 800),
		materialGround
	);

	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog =  new THREE.Fog(0xcce0ff, 400, 900);

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
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
		pulando = true;
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}

	if (e.keyCode == 38){ //douwn
		camera.position.z-=0.5;
	}
	if (e.keyCode == 40){ // UP
		camera.position.z+=0.5;
	}
}

var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização
	
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init