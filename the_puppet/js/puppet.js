//Segurar o espaço para entrar em posição de combate, 
//em seguida precionar a tecla "r" para socar de um lado e "l"  para socar de outro
//também é possível chutar com "t" e "k"
//soltando o espaço ele volta para posição normal, os golpes só irão funcionar enquanto estiver segurando o botão do "espaço".
//após usar o "r" ou "t", precisa usar o "k" ou "l" para poder usar novamente. Também pode soltar o "espaço" para
//resetar a posição. *Não consegui tratar para voltar a posição de combate quando usa essas duas teclas "r" e "t"*

var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var elementos = [];
var velocidade = 0.07;

var criaMonstro = function (){
	let puppet = [];

	let red = 	new THREE.Color(1,0,0);
	let green = new THREE.Color(0,1,0);
	let blue = 	new THREE.Color(0,0,1);
	let cores = [red, green, blue];

	let materials = [
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: green}),
		new THREE.MeshBasicMaterial({color: blue})
	];

	let tronco = new THREE.Mesh(new THREE.BoxGeometry(4, 9, 2), materials);
	puppet["tronco"] = tronco;

	let cabeca = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({color: blue}));
	puppet["cabeca"] = cabeca;
	tronco.add(cabeca);
	cabeca.position.y = tronco.position.y+7;

	//bracoDireito
	let ombroD = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 28), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["ombroD"] = ombroD;
	tronco.add(ombroD);
	ombroD.position.y = tronco.position.y+4;
	ombroD.position.x = tronco.position.x+3;

	let pivotOmbroD = new THREE.Group();
	puppet["pivotOmbroD"] = pivotOmbroD;
	ombroD.add(pivotOmbroD);
	
	let bracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 2.7, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoD"] = bracoD;
	pivotOmbroD.add(bracoD);
	bracoD.position.y -= 2.4;

	let artBracoD = new THREE.Mesh(new THREE.SphereGeometry(0.6, 15, 15), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["artBracoD"] = artBracoD;
	bracoD.add(artBracoD);
	artBracoD.position.y = bracoD.position.y+0.47;

	let pivotArtBracoD = new THREE.Group();
	puppet["pivotArtBracoD"] = pivotArtBracoD;
	artBracoD.add(pivotArtBracoD);

	let anteBracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 2.7, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["anteBracoD"] = anteBracoD;
	pivotArtBracoD.add(anteBracoD);
	anteBracoD.position.y -= 1.95;

	//bracoEsquerdo
	let ombroE = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 28), new THREE.MeshBasicMaterial({color: 0xffffff}))
	puppet["ombroE"] = ombroE;
	tronco.add(ombroE);
	ombroE.position.y = tronco.position.y+4;
	ombroE.position.x = tronco.position.x-3;

	let pivotOmbroE = new THREE.Group();
	puppet["pivotOmbroE"] = pivotOmbroE;
	ombroE.add(pivotOmbroE);

	let bracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 2.7, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoE"] = bracoE;
	pivotOmbroE.add(bracoE);
	bracoE.position.y -= 2.4;

	let artBracoE = new THREE.Mesh(new THREE.SphereGeometry(0.6, 15, 15), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["artBracoD"] = artBracoE;
	bracoE.add(artBracoE);
	artBracoE.position.y = bracoE.position.y+0.47;

	let pivotArtBracoE = new THREE.Group();
	puppet["pivotArtBracoE"] = pivotArtBracoE;
	artBracoE.add(pivotArtBracoE);

	let anteBracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 2.7, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["anteBracoE"] = anteBracoE;
	pivotArtBracoE.add(anteBracoE);
	anteBracoE.position.y -= 1.95;

	//pernaDireita
	let coxaD = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3, 2), new THREE.MeshBasicMaterial({color: red}));
	puppet["coxaD"] = coxaD;
	tronco.add(coxaD);
	coxaD.position.y = tronco.position.y-6;
	coxaD.position.x = tronco.position.x+1;

	let artJoelhoD = new THREE.Mesh(new THREE.SphereGeometry(0.8, 15, 15), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["artJoelhoD"] = artJoelhoD;
	coxaD.add(artJoelhoD);
	artJoelhoD.position.y = coxaD.position.y+3.8;

	let pivotArtJoelhoD = new THREE.Group();
	puppet["pivotArtJoelhoD"] = pivotArtJoelhoD;
	artJoelhoD.add(pivotArtJoelhoD);

	let panturrilhaD = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3, 2), new THREE.MeshBasicMaterial({color: red}));
	puppet["panturrilhaD"] = panturrilhaD;
	pivotArtJoelhoD.add(panturrilhaD);
	panturrilhaD.position.y -= 2.2;

	//pernaEsquerda
	let coxaE = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3, 2), new THREE.MeshBasicMaterial({color: red}));
	puppet["coxaE"] = coxaE;
	tronco.add(coxaE);
	coxaE.position.y = tronco.position.y-6;
	coxaE.position.x = tronco.position.x-1;

	let artJoelhoE = new THREE.Mesh(new THREE.SphereGeometry(0.8, 15, 15), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["artJoelhoE"] = artJoelhoE;
	coxaE.add(artJoelhoE);
	artJoelhoE.position.y = coxaE.position.y+3.8;

	let pivotArtJoelhoE = new THREE.Group();
	puppet["pivotArtJoelhoE"] = pivotArtJoelhoE;
	artJoelhoE.add(pivotArtJoelhoE);

	let panturrilhaE = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3, 2), new THREE.MeshBasicMaterial({color: red}));
	puppet["panturrilhaE"] = panturrilhaE;
	pivotArtJoelhoE.add(panturrilhaE);
	panturrilhaE.position.y -= 2.2;

	elementos["puppet"] = puppet;
	scene.add(tronco);
};



var init = function (){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 150);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera.position.z =80;
	camera.position.x = 0;
	camera.position.y = 2;
	
	criaMonstro();
	

	animation();


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
	x : 0,
	y : 0
}

var onMouseMove = function(e) {
	let diferencaMovimento = {
		x : e.offsetX - mouserPosAnterior.x,
		y : e.offsetY - mouserPosAnterior.y
	}

	if(clicando) {
		let angulosQuaternion = new THREE.Quaternion().setFromEuler(
			new THREE.Euler (paraRadianos(diferencaMovimento.y)*0.5, 
							paraRadianos(diferencaMovimento.x)*0.5, 
							0, 
							'XYZ')
		);
		scene.quaternion.multiplyQuaternions(angulosQuaternion, scene.quaternion);
	}
	mouserPosAnterior = {
		x : e.offsetX,
		y : e.offsetY
	}
}

var onMouseClick = function(e) {
	clicando = true;
}

var onMouseUp = function(e) {
	clicando = false;
}

var onMouseWheel = function (e){
	elementos["puppet"]["tronco"].scale.x+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.y+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.z+= (e.deltaY > 0)?-0.1:0.1;
}

var key_r = false;
var key_space = false;
var key_l = false;
var key_t = false;
var key_k = false;
var apertado_key_t = false;

var soltouBotao = function(e){
	console.log('soltou '+ e.keyCode);

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 76){ //l
		key_l = false;
	}
	if (e.keyCode == 84){ //t
		key_t = false;
	}
	if (e.keyCode == 75){ //k
		key_k = false;
	}
}


var apertouButao =  function(e){
	console.log('apertou '+ e.keyCode);

	if (e.keyCode == 82){ //r
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
	}
	if (e.keyCode == 76){ // l
		key_l = true;		
	}
	if (e.keyCode == 84){ //t
		key_t = true;
	}
	if (e.keyCode == 75){ //k
		key_k = true;
	}
}

var count = 0; 
var velocidadeOmbros = -0.03;
var velocidadeAnteBraco = -0.02;
var velocidadeCoxas = -0.03;
var velocidadeTronco = -0.02;
var velocidadeSocoE = -0.01;
var velocidadeSocoD = -0.01;
var velocidadeRotSoco = -0.03;
var flag_tronco = false;
var flag_posicao = false;
var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	if (flag_tronco == false) {
		if (key_space){
			posicao_combate();
		} else {
			posicao_descanso();
		}
	}

	if (key_l) {
		soco_esquerdo();
	} else {
			retornar_posicao_combate();
	}

	if (key_k) {
		chute_esquerdo();
	}

	if (key_r) {
		soco_direito();
	}

	if (key_t) {
		chute_direito();
		apertado_key_t = true;
	}
	
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

var posicao_combate = function() {
	if (elementos["puppet"]["pivotOmbroD"].rotation.x > -1 && elementos["puppet"]["pivotOmbroE"].rotation.x > -1) {
		elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeOmbros;
		elementos["puppet"]["pivotOmbroE"].rotation.x += velocidadeOmbros;

		if (elementos["puppet"]["pivotOmbroD"].rotation.z < 0.5) {
			elementos["puppet"]["pivotOmbroD"].rotation.z -= velocidadeOmbros;
		}
		if (elementos["puppet"]["pivotOmbroE"].rotation.z < 0.1) {
			elementos["puppet"]["pivotOmbroE"].rotation.z -= velocidadeOmbros;
		}
	} else {
		if (elementos["puppet"]["pivotArtBracoD"].rotation.x > -1) {
			elementos["puppet"]["pivotArtBracoD"].rotation.x += velocidadeAnteBraco;
		}
		if (elementos["puppet"]["pivotArtBracoE"].rotation.x > -2) {
			elementos["puppet"]["pivotArtBracoE"].rotation.x += velocidadeAnteBraco;
		}
		if (elementos["puppet"]["pivotArtBracoD"].rotation.z > -0.5 && elementos["puppet"]["pivotArtBracoE"].rotation.z < 0.5) {
			elementos["puppet"]["pivotArtBracoD"].rotation.z += velocidadeAnteBraco;
			elementos["puppet"]["pivotArtBracoE"].rotation.z -= velocidadeAnteBraco;
		}
	}

	if (elementos["puppet"]["tronco"].rotation.y > -0.5) {
		elementos["puppet"]["tronco"].rotation.y += velocidadeTronco;
	} 
	if (elementos["puppet"]["coxaD"].rotation.x > -0.5) {
		elementos["puppet"]["coxaD"].rotation.x += velocidadeCoxas;
	}
	if (elementos["puppet"]["coxaD"].rotation.y < 0.5 && elementos["puppet"]["coxaD"].rotation.z < 0.3) {
		elementos["puppet"]["coxaD"].rotation.y -= velocidadeTronco;
		elementos["puppet"]["coxaD"].rotation.z -= velocidadeTronco;
	}
	if (elementos["puppet"]["coxaE"].rotation.x > -0.8) {
		elementos["puppet"]["coxaE"].rotation.x += velocidadeCoxas;
	}                 
	if (elementos["puppet"]["pivotArtJoelhoD"].rotation.x < 1.2) {
		elementos["puppet"]["pivotArtJoelhoD"].rotation.x -= velocidadeCoxas;
	}
	if (elementos["puppet"]["pivotArtJoelhoE"].rotation.x <  1.68) {
		elementos["puppet"]["pivotArtJoelhoE"].rotation.x -= velocidadeCoxas;
	}
	flag_posicao = true;
}

var posicao_descanso = function() {
	if (elementos["puppet"]["pivotOmbroD"].rotation.x < 0 && elementos["puppet"]["pivotOmbroE"].rotation.x < 0) {
		elementos["puppet"]["pivotOmbroD"].rotation.x -= velocidadeOmbros;
		elementos["puppet"]["pivotOmbroE"].rotation.x -= velocidadeOmbros;

		if (elementos["puppet"]["pivotOmbroD"].rotation.z > 0) {
			elementos["puppet"]["pivotOmbroD"].rotation.z += velocidadeOmbros;
		}
		if (elementos["puppet"]["pivotOmbroE"].rotation.z > 0) {
			elementos["puppet"]["pivotOmbroE"].rotation.z += velocidadeOmbros;
		}
	} else {
		if (elementos["puppet"]["pivotArtBracoD"].rotation.x < 0) {
			elementos["puppet"]["pivotArtBracoD"].rotation.x -= velocidadeAnteBraco;
		}
		if (elementos["puppet"]["pivotArtBracoE"].rotation.x < 0) {
			elementos["puppet"]["pivotArtBracoE"].rotation.x -= velocidadeAnteBraco;
		}
		if (elementos["puppet"]["pivotArtBracoD"].rotation.z < 0 && elementos["puppet"]["pivotArtBracoE"].rotation.z > 0) {
			elementos["puppet"]["pivotArtBracoD"].rotation.z -= velocidadeAnteBraco;
			elementos["puppet"]["pivotArtBracoE"].rotation.z += velocidadeAnteBraco;
		}
	}
	
	if (elementos["puppet"]["tronco"].rotation.y < 0) {
		elementos["puppet"]["tronco"].rotation.y -= velocidadeTronco;
	}
	if (elementos["puppet"]["coxaD"].rotation.x < 0) {
		elementos["puppet"]["coxaD"].rotation.x -= velocidadeCoxas;
	}
	if (elementos["puppet"]["coxaD"].rotation.y > 0 && elementos["puppet"]["coxaD"].rotation.z > 0) {
		elementos["puppet"]["coxaD"].rotation.y += velocidadeTronco;
		elementos["puppet"]["coxaD"].rotation.z += velocidadeTronco;
	}
	if (elementos["puppet"]["coxaE"].rotation.x < 0) {
		elementos["puppet"]["coxaE"].rotation.x -= velocidadeCoxas;
	}
	if (elementos["puppet"]["pivotArtJoelhoD"].rotation.x > 0) {
		elementos["puppet"]["pivotArtJoelhoD"].rotation.x += velocidadeCoxas;
	}
	if (elementos["puppet"]["pivotArtJoelhoE"].rotation.x > 0) {
		elementos["puppet"]["pivotArtJoelhoE"].rotation.x += velocidadeCoxas;
	}	    
}

var soco_esquerdo = function() {
	flag_tronco = true;
	if (key_space == true && flag_posicao == true) { 
		if (elementos["puppet"]["tronco"].rotation.y < 0.1) {
			elementos["puppet"]["tronco"].rotation.y -= velocidadeRotSoco;

			if (elementos["puppet"]["pivotOmbroE"].rotation.x > -1.6) {
				elementos["puppet"]["pivotOmbroE"].rotation.x += velocidadeSocoE;
			}
			if (elementos["puppet"]["pivotArtBracoE"].rotation.x < 0.2) {
				elementos["puppet"]["pivotArtBracoE"].rotation.x -= velocidadeSocoE-0.1;
			}
		}
	}
}

var chute_esquerdo = function() {
	flag_tronco = true;
	if (key_space == true && flag_posicao == true) { 
		if (elementos["puppet"]["tronco"].rotation.y < 0.1) {
			elementos["puppet"]["tronco"].rotation.y -= velocidadeRotSoco;
			if (elementos["puppet"]["coxaE"].rotation.x > -1.6) {
				elementos["puppet"]["coxaE"].rotation.x += velocidadeSocoE;
			}
			if (elementos["puppet"]["pivotArtJoelhoE"].rotation.x > 0.2) {
				elementos["puppet"]["pivotArtJoelhoE"].rotation.x += velocidadeSocoE-0.1;
			}
		}
	}	
}

var soco_direito = function() {
	flag_tronco = true;
	if (key_space == true && flag_posicao == true) { 
		if (elementos["puppet"]["tronco"].rotation.y > -0.8) {
			elementos["puppet"]["tronco"].rotation.y += velocidadeRotSoco;

			if (elementos["puppet"]["pivotOmbroD"].rotation.x > -1.6) {
				elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeSocoD;
			}
			if (elementos["puppet"]["pivotArtBracoD"].rotation.x < 0.2) {
				elementos["puppet"]["pivotArtBracoD"].rotation.x -= velocidadeSocoD-0.1;
			}
		}
	}
}

var chute_direito = function() {
	flag_tronco = true;
	if (key_space == true && flag_posicao == true) { 
		if (elementos["puppet"]["tronco"].rotation.y > -0.8) {
			elementos["puppet"]["tronco"].rotation.y += velocidadeRotSoco;
			if (elementos["puppet"]["coxaD"].rotation.x > -1.2) {
				elementos["puppet"]["coxaD"].rotation.x += velocidadeSocoD-0.05;
			}
			if (elementos["puppet"]["pivotArtJoelhoD"].rotation.x > -0.7) {
				elementos["puppet"]["pivotArtJoelhoD"].rotation.x += velocidadeSocoD-0.04 ;
			}
		}
	}
}

var retornar_posicao_combate = function() {
	flag_tronco = false;
	if (elementos["puppet"]["tronco"].rotation.x > 0) {
		elementos["puppet"]["tronco"].rotation.x += velocidadeSocoE;

		if (elementos["puppet"]["pivotOmbroE"].rotation.x < -1.2) {
			elementos["puppet"]["pivotOmbroE"].rotation.x -= velocidadeSocoE;
		}
		if (elementos["puppet"]["pivotArtBracoE"].rotation.x > -2.1) {
			elementos["puppet"]["pivotArtBracoE"].rotation.x += velocidadeSocoE;
		}
	}
}

function paraRadianos(angulo) {
	return angulo * (Math.PI/180);
}

window.onload = this.init