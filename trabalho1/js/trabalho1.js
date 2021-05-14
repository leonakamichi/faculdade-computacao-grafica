var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsável por renderizar tudo;

var elementos = [];

var velocidade = 0.80;
var velocidade2 = 0.50;

var criaGeometria = function() {
    // let red = new THREE.Color(1, 0, 0); //Criando cores(R, G, B)
    // let green = new THREE.Color(0, 1, 0);
    // let blue = new THREE.Color(0, 0, 1);
    // let cores = [red, green, blue];

    // for (let i = 0; i < 3; i++) {
    //     geometria.faces[4*i].color = cores[i];
    //     geometria.faces[4*i+1].color = cores[i];
    //     geometria.faces[4*i+2].color = cores[i];
    //     geometria.faces[4*i+3].color = cores[i];
    // }

    let radius = 4;
    let detail = 1;
    let geometria = new THREE.DodecahedronGeometry(radius, detail);
    let material = new THREE.MeshBasicMaterial({color: "blue"}); //Cria malha basica, tipo material
    let dodecaedro = new THREE.Mesh(geometria, material); //Cria uma malha de triangulo

    dodecaedro.position.x = -3;
    elementos["dodecaedro"] = dodecaedro;

    let radius2 = 4;
    let geometria2 = new THREE.OctahedronGeometry(radius2);
    let material2 = new THREE.MeshBasicMaterial({color: "red"});
    let octaedro = new THREE.Mesh(geometria2, material2);

    octaedro.position.y = 6;
    elementos["octaedro"] = octaedro;

    scene.add(dodecaedro);
    scene.add(octaedro);    
};

var init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100); //vem de Jesus
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement); //Estrutura como HTML

    camera.position.z = 100; //Profundidade da camera
    camera.position.x = 0; //Horizontal
    camera.position.y = 0; //Vertical

    criaGeometria();

    animation();
};

var animation = function() {
    requestAnimationFrame(animation); //Adiciona o método na fila de renderização
    
    elementos["dodecaedro"].position.x +=velocidade;
    if (elementos["dodecaedro"].position.x > 70) {
        velocidade *=-1;
    } else if (elementos["dodecaedro"].position.x < -70) {
        velocidade *=-1;
    }

    elementos["dodecaedro"].position.y +=velocidade;
    if (elementos["dodecaedro"].position.y > 32) {
        velocidade *=-1;
    } else if (elementos["dodecaedro"].position.y < -32) {
        velocidade *=-1;
    }

    elementos["octaedro"].position.y +=velocidade2;
    if (elementos["octaedro"].position.y > 32) {
        velocidade2 *=-1;
    } else if (elementos["octaedro"].position.y < -32) {
        velocidade2 *=-1;
    }

    renderer.render(scene, camera);//Tira uma foto do estado e mostra na tela
}

window.onload = this.init;