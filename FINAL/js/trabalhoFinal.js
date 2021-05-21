var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouse
//google-chrome --allow-file-access-from-files


var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var groundAsfalto;
var groundGrama;
var geometriaA;

var lights = [];

var char = [];

var objLoading = function() {
	loaderCaixa1 = new THREE.OBJLoader();
	loaderCaixa1.load(
		'assets/obstaculos/Crate/crate.obj',
		function(obj) {
			
			elementos['caixa1'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Crate/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("crate.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = 12;
			obj.position.y = -5.3;
			obj.position.z = 200;

			scene.add(obj);
			console.log("Carregou Caixa !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderCaixa2 = new THREE.OBJLoader();
	loaderCaixa2.load(
		'assets/obstaculos/Crate/crate.obj',
		function(obj) {
			
			elementos['caixa2'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Crate/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("crate.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = 35;
			obj.position.y = -5.3;
			obj.position.z = 0;

			scene.add(obj);
			console.log("Carregou Caixa2 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderCaixa3 = new THREE.OBJLoader();
		loaderCaixa3.load(
		'assets/obstaculos/Crate/crate.obj',
		function(obj) {
			
			elementos['caixa3'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Crate/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("crate.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = -15;
			obj.position.y = -5.3;
			obj.position.z = 400;

			scene.add(obj);
			console.log("Carregou Caixa3 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderCaixa4 = new THREE.OBJLoader();
		loaderCaixa4.load(
		'assets/obstaculos/Crate/crate.obj',
		function(obj) {
			
			elementos['caixa4'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Crate/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("crate.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = -10;
			obj.position.y = -5.3;
			obj.position.z = -50;

			scene.add(obj);
			console.log("Carregou Caixa3 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderBox1 = new THREE.OBJLoader();
	loaderBox1.load(
		'assets/obstaculos/Box/ammoBox.obj',
		function(obj) {
			
			elementos['box1'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Box/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("box.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = -20;
			obj.position.y = -0.5;
			obj.position.z = 60;

			scene.add(obj);
			console.log("Carregou Box1 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderBox2 = new THREE.OBJLoader();
	loaderBox2.load(
		'assets/obstaculos/Box/ammoBox.obj',
		function(obj) {
			
			elementos['box2'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Box/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("box.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = 30;
			obj.position.y = -0.5;
			obj.position.z = 320;

			scene.add(obj);
			console.log("Carregou Box2 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderBox3 = new THREE.OBJLoader();
	loaderBox3.load(
		'assets/obstaculos/Box/ammoBox.obj',
		function(obj) {
			
			elementos['box3'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Box/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("box.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = 30;
			obj.position.y = -0.5;
			obj.position.z = -150;

			scene.add(obj);
			console.log("Carregou Box3 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderBox4 = new THREE.OBJLoader();
	loaderBox4.load(
		'assets/obstaculos/Box/ammoBox.obj',
		function(obj) {
			
			elementos['box4'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/obstaculos/Box/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("box.jpg");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 0.3; 
			obj.scale.z = 0.3;
			obj.scale.x = 0.3;

            obj.position.x = -25;
			obj.position.y = -0.5;
			obj.position.z = -240;

			scene.add(obj);
			console.log("Carregou Box4 !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);
}

var fbxLoading = function() {
	loaderCarro = new THREE.FBXLoader();
	loaderCarro.load(
		'assets/carro/Models/car_1.fbx',
		function(obj) {
			
			elementos['carro'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/carro/Textures/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshLambertMaterial();
						let materialBase = texLoader.load("CarTexture1.png");
						material.map = materialBase;
						child.material = material;

						child.castShadow = true;
						child.receiveShadow = true;
					} 
				}
			);

			obj.scale.y = 8; 
			obj.scale.z = 8;
			obj.scale.x = 8;

            obj.position.x = 0;
			obj.position.y = -5;
			obj.position.z = 500;

			obj.rotation.x -= 4.7;
			obj.rotation.z += 1.6;

			char = new THREE.Group();
			char.add(camera);
			char.add(obj);

			scene.add(char);
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

var ambientLightOn = function () {
	lights['ambient'] = new THREE.AmbientLight(0xffffff);
	lights['ambient'].intensity = 0.6;
	scene.add(lights['ambient']);
}

var hemisphereLightOn = function () {
	lights['hemisphere'] = new THREE.HemisphereLight(0xcce0ff);
	scene.add(lights['hemisphere']);
}

var directionalLightOn = function () {
	let light = new THREE.DirectionalLight(0xffffff,1);
	light.castShadow = true;
	light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.left = 1000;
    light.shadow.camera.bottom = 1000;
    light.shadow.camera.right = -1000
    light.shadow.camera.top = -1000;

	light.position.y = 300;
	light.position.x = 195;

	light.intensity = 1;
	light.target = groundAsfalto;

	scene.add(light);
	scene.add(light.target);

	lights['directional'] = light;
}

var godSaysLightsOn = function() {
	ambientLightOn();
	directionalLightOn();
	//hemisphereLightOn();
};

var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		ambientLight: 1,
		sunLight: 1,
		rotationY: 0,

		carColor : "#000000",
		groundColor: "#006400",

		carro: "",
		modelGUI: ""
	};

	let intensidadeLuz = gui.add(parametrosGUI, 'ambientLight').min(0).max(2).step(0.1).name("Ambiente Light");
	intensidadeLuz.onChange(function (parametro){
		lights['ambient'].intensity = parametro;
		}
	);

	let sunLight = gui.add(parametrosGUI, 'sunLight').min(0).max(2).step(0.1).name("Sun Light");
	sunLight.onChange(function (parametro){
		lights['directional'].intensity = parametro;
		}
	);

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
	scene.background = new THREE.Color(0xcce0ff);
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						800 //far
					);
	
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 620;
	camera.position.x = 0;
	camera.position.y = 50;
	
	createGui();

	fbxLoading();

	objLoading();

	animation();


	// ASFALTO
	let textureLoad = new THREE.TextureLoader();
	let groundTextureAsfalto = textureLoad.load("assets/asfalto/Road007_2K_Color.jpg"); //busca a imagem
	groundTextureAsfalto.wrapS = groundTextureAsfalto.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTextureAsfalto.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTextureAsfalto.repeat.set(1, 1); //número de vezes que ela vai se repetir dentro do nosso chão

	let materialGroundAsfalto = new THREE.MeshStandardMaterial({map: groundTextureAsfalto});
	materialGroundAsfalto.normalMap = textureLoad.load("assets/asfalto/Road007_2K_Normal.jpg"); //busca a normal, que dá noção de profundidade
	materialGroundAsfalto.roughnessMap = textureLoad.load("assets/asfalto/Road007_2K_Roughness.jpg");
	materialGroundAsfalto.displacementMap = textureLoad.load("assets/asfalto/Road007_2K_Displacement.jpg");
	materialGroundAsfalto.displacementScale = 1;
	materialGroundAsfalto.displacementBias = 1;

	groundAsfalto = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(100, 1500),
		materialGroundAsfalto
	);

	groundAsfalto.receiveShadow = true;
	groundAsfalto.rotation.x = - Math.PI/2;
	groundAsfalto.position.y-=7.5;

	// GRAMA
	let groundTextureGrama = textureLoad.load("assets/grama/Grass003_4K_Color.jpg"); //busca a imagem
	groundTextureGrama.wrapS = groundTextureGrama.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTextureGrama.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTextureGrama.repeat.set(25, 25); //número de vezes que ela vai se repetir dentro do nosso chão

	let materialGroundGrama = new THREE.MeshStandardMaterial({map: groundTextureGrama});
	materialGroundGrama.normalMap = textureLoad.load("assets/grama/Grass003_4K_Normal.jpg"); //busca a normal, que dá noção de profundidade
	materialGroundGrama.roughnessMap = textureLoad.load("assets/grama/Grass003_4K_Roughness.jpg");
	materialGroundGrama.displacementMap = textureLoad.load("assets/grama/Grass003_4K_Displacement.jpg");
	materialGroundGrama.displacementScale = 1;
	materialGroundGrama.displacementBias = 1;

	groundGrama = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1500, 1500),
		materialGroundGrama
	);

	groundGrama.receiveShadow = true;
	groundGrama.rotation.x = - Math.PI/2;
	groundGrama.position.y-=7.5;	



	scene.add(groundGrama);
	scene.add(groundAsfalto);

	godSaysLightsOn();

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog =  new THREE.Fog(0xcce0ff, 400, 900);

	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);
};

var key_r = false;
var key_space = false;
var key_q = false;

var soltouBotao = function(e){

	if (e.keyCode == 37){ //left
		char.position.x -= 0;
	}

	if (e.keyCode == 39){ //right
		char.position.x += 0;
	}

	if (e.keyCode == 38){ //up
		char.position.z -= 0;
	}

	if (e.keyCode == 40){ //down
		char.position.z += 0;
	}
}


var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 37){ //left
		char.position.x -= 2;
	}

	if (e.keyCode == 39){ //right
		char.position.x += 2;
	}

	if (e.keyCode == 38){ //up
		char.position.z -= 3;
	}
	if (e.keyCode == 40){ //down
		char.position.z += 3;
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