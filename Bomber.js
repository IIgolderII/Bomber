var canvasBomber = document.getElementById('bomber')
canvasBomber.width = canvasBomber.clientWidth
canvasBomber.height = canvasBomber.clientHeight
var ctxBomber = canvasBomber.getContext('2d')


terrain1 = [
    'terrain', 'bomb', 'terrain',
    'vide', 'block', 'block',
    'terrain', 'block', 'terrain'
]


class Bloc {
    constructor(type, x, y) {
        this.type = type
        this.x = x
        this.y = y
        this.width = 50
        switch (type) {
            case 'terrain':
                this.color = '#000'
                this.shape = 'square'
                break;

            case 'block':
                this.color = '#aaa'
                this.shape = 'square'
                break;

            case 'bomb':
                this.color = '#000'
                this.shape = 'circle'
                break;

            case 'vide':
                this.color = '#fff'
                this.shape = 'square'
                break;

            default:
                this.color = '#fff'
                this.shape = 'square'
                break;
        }
    }

    draw() {
        ctxBomber.beginPath();
        ctxBomber.fillStyle = this.color;
        if (this.shape == 'square') {
            ctxBomber.rect(this.x * this.width, this.y * this.width, this.width, this.width);
        } else if (this.shape == 'circle') {
            ctxBomber.arc(this.x * this.width + this.width / 2, this.y * this.width + this.width / 2, this.width / 2, 0, 180);
        }
        ctxBomber.fill();
    }
}

class Joueur {
    constructor() {
        this.x = 10
        this.y = 60
        this.width = 10
        this.color = '#00f'
    }

    draw() {
        ctxBomber.beginPath();
        ctxBomber.fillStyle = this.color;
        ctxBomber.arc(this.x + this.width, this.y + this.width, this.width, 0, 180);
        ctxBomber.fill();
    }
}

newGame()

function newGame() {
    terrainActif = terrain1
    terrain = []
    n = 0
    for (let i = 0; i < Math.sqrt(terrainActif.length); i++) {
        terrain.push([])
        for (let j = 0; j < Math.sqrt(terrainActif.length); j++) {
            terrain[i][j] = new Bloc(terrainActif[n++], j, i)
        }

    }
    joueur = new Joueur()
    jeu = setInterval(gameLoop, 100)
}

function gameLoop() {

    ctxBomber.clearRect(0, 0, canvasBomber.width, canvasBomber.height)

    // ctxBomber.beginPath()
    // ctxBomber.fillStyle = '#000'
    // ctxBomber.fillRect(0, 0, canvasBomber.width, canvasBomber.height)
    // ctxBomber.fill()

    terrain.forEach(row => {
        row.forEach(element => {
            element.draw()
        })
    });

    joueur.draw()

}