var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
//google-chrome --allow-file-access-from-files


var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var ground;
var geometriaA;

var objLoading = function() {
	loaderJaguar = new THREE.OBJLoader();
	loaderJaguar.load(
		'assets/Jaguar.obj',
		function(obj) {
			
			elementos['jaguar'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0xe1c600");
					} 
				}
			);

			obj.scale.y = 2; 
			obj.scale.z = 2;
			obj.scale.x = 2;

            obj.position.x = -16;
			obj.position.y = -6;
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

    loaderAguia = new THREE.OBJLoader();
	loaderAguia.load(
		'assets/Pitbull.obj',
		function(obj) {
			
			elementos['pitbull'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0x432a07");
					} 
				}
			);

			obj.scale.y = 1; 
			obj.scale.z = 1;
			obj.scale.x = 1;

            obj.position.x = -5;
			obj.position.y = -7;
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

    loaderGalinha = new THREE.OBJLoader();
	loaderGalinha.load(
		'assets/Galinha.obj',
		function(obj) {
	
			elementos['galinha'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0xe8dcdc");
					} 
				}
			);

			obj.scale.y = 0.5; 
			obj.scale.z = 0.5;
			obj.scale.x = 0.5;

            obj.position.x = 16;
			obj.position.y = -3;
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

    loaderTartaruga = new THREE.OBJLoader();
	loaderTartaruga.load(
		'assets/Tartaruga.obj',
		function(obj) {
			elementos['tartaruga'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0xf0e55d");
					} 
				}
			);

			obj.scale.y = 0.4; 
			obj.scale.z = 0.4;
			obj.scale.x = 0.4;

            obj.position.x = 30;
			obj.position.y = -5;
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

    loaderBurro = new THREE.OBJLoader();
	loaderBurro.load(
		'assets/Burro.obj',
		function(obj) {
			elementos['burro'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0x4e4c51");
					} 
				}
			);

			obj.scale.y = 1.5; 
			obj.scale.z = 1.5;
			obj.scale.x = 1.5;

            obj.position.x = 3;
			obj.position.y = -7;
			obj.position.z = 15;

            obj.rotation.y -= 1;

			scene.add(obj);
			console.log("Carregou Burro !");

		},
		function(andamento) {
			console.log("Carregando..." + (andamento.loaded / andamento.total) * 100 + " %");
		},
		function(error) {
			console.log("Deu merda!: "+ error);
		},
	);

    loaderGorila = new THREE.OBJLoader();
	loaderGorila.load(
		'assets/Gorila.obj',
		function(obj) {
			elementos['gorila'] = obj;

			obj.traverse(function(child) {
					if(child instanceof THREE.Mesh) {
						child.material.color.setHex("0x201e20");
					} 
				}
			);

			obj.scale.y = 1.3; 
			obj.scale.z = 1.3;
			obj.scale.x = 1.3;

            obj.position.x = -30;
			obj.position.y = -1;
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
};

var godSaysLightsOn = function() {
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100, 100, 100);
	scene.add(spot);

	scene.add(new THREE.AmbientLight(0xffffff));
};

var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		rotationY: 0,

		skyColor : "#000000",
		groundColor: "#006400",
        //animalColor: "",

		animais: "",
		modelGUI: ""
	};

	let opcoes = ['Jaguar', 'Pitbull', 'Galinha', 'Tartaruga', 'Burro', 'Gorila'];
	let comboChange = gui.add(parametrosGUI, 'animais').options(opcoes).name("Animais");
	comboChange.onChange(function(parametro){
			if (parametro == 'Jaguar'){
				camera.lookAt(elementos["jaguar"].position);
				parametrosGUI.modelGUI = "jaguar";
                //parametrosGUI.animalColor = "#e1c600";
			} else if (parametro == 'Pitbull') {
                camera.lookAt(elementos["pitbull"].position);
				parametrosGUI.modelGUI = "pitbull";
                //parametrosGUI.animalColor = "#432a07";
            } else if (parametro == 'Galinha') {
                camera.lookAt(elementos["galinha"].position);
				parametrosGUI.modelGUI = "galinha";
                //parametrosGUI.animalColor = "#e8dcdc";
            } else if (parametro == 'Tartaruga') {
                camera.lookAt(elementos["tartaruga"].position);
				parametrosGUI.modelGUI = "tartaruga";
                //parametrosGUI.animalColor = "#f0e55d";
            } else if (parametro == 'Burro') {
                camera.lookAt(elementos["burro"].position);
				parametrosGUI.modelGUI = "burro";
                //parametrosGUI.animalColor = "#4e4c51";
            } else if (parametro == 'Gorila') {
                camera.lookAt(elementos["gorila"].position);
				parametrosGUI.modelGUI = "gorila";
                //parametrosGUI.animalColor = "#201e20";
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
	let sColor = colorFolder.addColor(parametrosGUI, 'skyColor').name("SkyColor");
	    sColor.onChange(function (parametro){
			scene.background= new THREE.Color(parametro);
		}
	);
	let gColor = colorFolder.addColor(parametrosGUI, 'groundColor').name("Ground");
	    gColor.onChange(function (parametro){
			ground.material.color.setHex(parametro.replace("#", "0x"));
		}
	);
	 
    // let aColor = colorFolder.addColor(parametrosGUI, 'animalColor').name("AnimalColor");
	// 	aColor.onChange(function (parametro){
	// 		elementos[parametrosGUI.modelGUI].traverse(function(child) {
	// 			if(child instanceof THREE.Mesh) {
	// 				child.material.color.setHex(parametro.replace("#", "0x"));
	// 			} 
	// 		}
	// 	);
	// });

	gui.open();
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x00BFFF)
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						80 //far
					);

	//Projeção paralela.
	// camera = new THREE.OrthographicCamera(
	// 	window.innerWidth/2,
	// 	-window.innerWidth/2,
	// 	window.innerHeight/2,
	// 	-window.innerHeight/2,
	// 	0.11,
	// 	90
	// );

	// geometriaA = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ color: 0xff0000}));
	// geometriaA.position.x = -8;
	// scene.add(geometriaA);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;

	godSaysLightsOn();
	
	createGui();

	objLoading();

	animation();


	//criar um piso.
	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		new THREE.MeshBasicMaterial({color: 0x006400})
	);
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);



	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

	//metodos do mouser
	document.addEventListener('mousewheel', onMouseWheel);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mousedown', onMouseClick);
	document.addEventListener('mouseup', onMouseUp);

	
};

var clicando = false;
var mouserPosAnterior = {
	x:0,
	y:0
}

var onMouseMove = function(e){
	let diferencaMovimento = {
		x: e.offsetX - mouserPosAnterior.x,
		y: e.offsetY - mouserPosAnterior.y
	}

	if (clicando){

		//  let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		//  	new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
		//  					    paraRadianos(diferencaMovimento.x)*0.5,
		//  						0,
		//  						'XYZ')
		//  );
		//  elementos["puppet"]["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, elementos["puppet"]["tronco"].quaternion);

		//camera.rotation.x += paraRadianos(diferencaMovimento.y)*0.1;
		//camera.rotation.y += paraRadianos(diferencaMovimento.x)*0.1;


	}
	mouserPosAnterior = {
		x: e.offsetX,
		y: e.offsetY
	}
};

var onMouseClick = function(e){
	clicando = true;	
};

var onMouseUp = function(e){
	clicando = false;
};

var onMouseWheel = function (e){
	elementos["puppet"]["tronco"].scale.x+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.y+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.z+= (e.deltaY > 0)?-0.1:0.1;

}



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