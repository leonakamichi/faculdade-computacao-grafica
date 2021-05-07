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
	loaderJaguar = new THREE.FBXLoader();
	loaderJaguar.load(
		'assets/Jaguar/Jaguar.fbx',
		function(obj) {
			
			elementos['jaguar'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Jaguar/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("Jaguar_texture.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.02; 
			obj.scale.z = 0.02;
			obj.scale.x = 0.02;

            obj.position.x = -16;
			obj.position.y = -7.5;
			obj.position.z = 5;

            obj.rotation.y += 0.9;

			scene.add(obj);
			console.log("Carregou Jaguar !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderPitbull = new THREE.FBXLoader();
	loaderPitbull.load(
		'assets/Pitbull/Pitbull.fbx',
		function(obj) {
			
			elementos['pitbull'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Pitbull/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("UVPitbull.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.01; 
			obj.scale.z = 0.01;
			obj.scale.x = 0.01;

            obj.position.x = -5;
			obj.position.y = -7.5;
			obj.position.z = 30;

            obj.rotation.y += 0.5;

			scene.add(obj);
			console.log("Carregou Pitbull !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderGalinha = new THREE.FBXLoader();
	loaderGalinha.load(
		'assets/Galinha/Galinha.fbx',
		function(obj) {
	
			elementos['galinha'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Galinha/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("UVChicken.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.009; 
			obj.scale.z = 0.009;
			obj.scale.x = 0.009;

            obj.position.x = 16;
			obj.position.y = -6.6;
			obj.position.z = 7;

			scene.add(obj);
			console.log("Carregou Galinha !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderTartaruga = new THREE.FBXLoader();
	loaderTartaruga.load(
		'assets/Tartaruga/Tartaruga.fbx',
		function(obj) {
			elementos['tartaruga'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Tartaruga/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("UVTurtle.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.006; 
			obj.scale.z = 0.006;
			obj.scale.x = 0.006;

            obj.position.x = 30;
			obj.position.y = -7.8;
			obj.position.z = 25;

            obj.rotation.y -= 1;

			scene.add(obj);
			console.log("Carregou Tartaruga !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderLeao = new THREE.FBXLoader();
	loaderLeao.load(
		'assets/Leao/Leao.fbx',
		function(obj) {
			elementos['leao'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Leao/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("Lion_low_default_AlbedoTransparency.jpg");
						material.encoding = materialBase.sRGBEncoding;
						material.map = materialBase;

						material.normalMap = texLoader.load("Lion_low_default_Normal.png");
						material.metalnessMap = texLoader.load("Lion_low_default_MetallicSmoothness.png");
						material.alphaMap = texLoader.load("Lion_low_default_Alfa.jpg");
						
						child.material = material;
					} 
				}
			);

			obj.scale.y = 3; 
			obj.scale.z = 3;
			obj.scale.x = 3;

            obj.position.x = -20;
			obj.position.y = -7.5;
			obj.position.z = 30;

            obj.rotation.y -= 3;

			scene.add(obj);
			console.log("Carregou Leão !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderGorila = new THREE.FBXLoader();
	loaderGorila.load(
		'assets/Gorila/Gorila.fbx',
		function(obj) {
			elementos['gorila'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Gorila/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("low_01 - Default_Diffuse.png");
						material.map = materialBase;

						material.normalMap = texLoader.load("1_normals.jpg");
						material.emissiveMap = texLoader.load = texLoader.load("low_01 - Default_Glossiness.png");

						child.material = material;
					} 
				}
			);

			obj.scale.y = 1.7; 
			obj.scale.z = 1.7;
			obj.scale.x = 1.7;

            obj.position.x = -30;
			obj.position.y = 0.2;
			obj.position.z = 25;

			scene.add(obj);
			console.log("Carregou Gorila !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderVeado = new THREE.FBXLoader();
	loaderVeado.load(
		'assets/Veado/Veado.fbx',
		function(obj) {
			
			elementos['veado'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Veado/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("UVDeer.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.02; 
			obj.scale.z = 0.02;
			obj.scale.x = 0.02;

            obj.position.x = 25;
			obj.position.y = -7.5;
			obj.position.z = 5;

            obj.rotation.y += 0.9;

			scene.add(obj);
			console.log("Carregou Veado !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderEsquilo = new THREE.FBXLoader();
	loaderEsquilo.load(
		'assets/Esquilo/Esquilo.fbx',
		function(obj) {
			
			elementos['esquilo'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Esquilo/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("1_vcols.jpg");
						material.map = materialBase;

						material.normalMap = texLoader.load("1_normals.jpg");
						material.emissiveMap = texLoader.load("low_01 - Default_Glossiness.png");

						child.material = material;
					} 
				}
			);

			obj.scale.y = 1; 
			obj.scale.z = 1;
			obj.scale.x = 1;

            obj.position.x = 20;
			obj.position.y = -6.8;
			obj.position.z = 30;

            obj.rotation.y -= 1.3;

			scene.add(obj);
			console.log("Carregou Esquilo !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderCoelho = new THREE.FBXLoader();
	loaderCoelho.load(
		'assets/Coelho/Coelho.fbx',
		function(obj) {
			
			elementos['coelho'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Coelho/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("UVRabbit.png");
						material.map = materialBase;

						child.material = material;
					} 
				}
			);

			obj.scale.y = 0.002; 
			obj.scale.z = 0.002;
			obj.scale.x = 0.002;

            obj.position.x = 15;
			obj.position.y = -7.5;
			obj.position.z = 30;

            obj.rotation.y += 1.3;

			scene.add(obj);
			console.log("Carregou Coelho !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

	loaderLobo = new THREE.FBXLoader();
	loaderLobo.load(
		'assets/Lobo/Lobo.fbx',
		function(obj) {
			
			elementos['lobo'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/Lobo/");

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("low_01 - Default_Diffuse.png");
						material.map = materialBase;

						material.normalMap = texLoader.load("low_01 - Default_Normal.png");
						material.emissiveMap = texLoader.load("low_01 - Default_Glossiness.png");

						child.material = material;
					} 
				}
			);

			obj.scale.y = 5; 
			obj.scale.z = 5;
			obj.scale.x = 5;

			obj.position.x = 3;
			obj.position.y = -3.6;
			obj.position.z = 15;

            obj.rotation.y += 0.6;

			scene.add(obj);
			console.log("Carregou Lobo !");

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

		animalColor : "#000000",
		groundColor: "#006400",

		animais: "",
		modelGUI: ""
	};

	let opcoes = ['Jaguar', 'Pitbull', 'Galinha', 'Tartaruga', 'Leao', 'Gorila', 'Veado', 'Esquilo', 'Coelho', 'Lobo'];
	let comboChange = gui.add(parametrosGUI, 'animais').options(opcoes).name("Animais");
	comboChange.onChange(function(parametro){
			if (parametro == 'Jaguar'){
				camera.lookAt(elementos["jaguar"].position);
				parametrosGUI.modelGUI = "jaguar";
			} else if (parametro == 'Pitbull') {
                camera.lookAt(elementos["pitbull"].position);
				parametrosGUI.modelGUI = "pitbull";
            } else if (parametro == 'Galinha') {
                camera.lookAt(elementos["galinha"].position);
				parametrosGUI.modelGUI = "galinha";
            } else if (parametro == 'Tartaruga') {
                camera.lookAt(elementos["tartaruga"].position);
				parametrosGUI.modelGUI = "tartaruga";
            } else if (parametro == 'Leao') {
                camera.lookAt(elementos["leao"].position);
				parametrosGUI.modelGUI = "leao";
            } else if (parametro == 'Gorila') {
                camera.lookAt(elementos["gorila"].position);
				parametrosGUI.modelGUI = "gorila";
            } else if (parametro == 'Veado') {
                camera.lookAt(elementos["veado"].position);
				parametrosGUI.modelGUI = "veado";
            } else if (parametro == 'Esquilo') {
                camera.lookAt(elementos["esquilo"].position);
				parametrosGUI.modelGUI = "esquilo";
            } else if (parametro == 'Coelho') {
                camera.lookAt(elementos["coelho"].position);
				parametrosGUI.modelGUI = "coelho";
            } else if (parametro == 'Lobo') {
                camera.lookAt(elementos["lobo"].position);
				parametrosGUI.modelGUI = "lobo";
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
	let aColor = colorFolder.addColor(parametrosGUI, 'animalColor').name("Animal Color");
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
						500 //far
					);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;

	godSaysLightsOn();
	
	createGui();

	fbxLoading();

	animation();


	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/terrain/grasslight-big.jpg"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(25, 25); //número de vezes que ela vai se repetir dentro do nosso chão

	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/terrain/grasslight-big-nm.jpg"); //busca a normal, que dá noção de profundidade

	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);

	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog =  new THREE.Fog(0xcce0ff, 200, 500);

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