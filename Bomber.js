var canvasBomber = document.getElementById('bomber')
canvasBomber.width = canvasBomber.clientWidth
canvasBomber.height = canvasBomber.clientHeight
var ctxBomber = canvasBomber.getContext('2d')


terrain1 = [
    ['terrain', 'terrain', 'terrain', 'terrain', 'terrain', 'terrain', 'terrain',],
    ['terrain', 'terrain', 'vide', 'terrain', 'block', 'terrain', 'terrain',],
    ['terrain', 'vide', 'vide', 'block', 'block', 'block', 'terrain',],
    ['terrain', 'terrain', 'block', 'terrain', 'block', 'terrain', 'terrain',],
    ['terrain', 'block', 'block', 'block', 'block', 'block', 'terrain',],
    ['terrain', 'terrain', 'block', 'terrain', 'block', 'terrain', 'terrain',],
    ['terrain', 'terrain', 'terrain', 'terrain', 'terrain', 'terrain', 'terrain',],
]

class Bloc {
    constructor(type, x, y) {
        this.type = type
        this.width = 100
        this.x = x * this.width
        this.y = y * this.width
        switch (type) {
            case 'terrain':
                this.color = '#000'
                this.shape = 'square'
                this.solid = true
                break;

            case 'block':
                this.color = '#aaa'
                this.shape = 'square'
                this.solid = true
                break;

            case 'bomb':
                this.color = '#000'
                this.shape = 'circle'
                this.solid = false
                break;

            case 'vide':
                this.color = '#fff'
                this.shape = 'square'
                this.solid = false
                break;

            case 'fire':
                this.color = '#f00'
                this.shape = 'square'
                this.solid = false
                break;

            default:
                this.color = '#fff'
                this.shape = 'square'
                this.solid = false
                break;
        }
    }

    draw() {
        ctxBomber.beginPath();
        ctxBomber.fillStyle = this.color;
        if (this.shape == 'square') {
            ctxBomber.rect(this.x, this.y, this.width, this.width);
        } else if (this.shape == 'circle') {
            switch (this.type) {
                case 'bomb':
                    ctxBomber.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2 * .8, 0, 180);
                    break;

                default:
                    ctxBomber.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, 180);
                    break;
            }
        }
        ctxBomber.fill();
    }
}

class Joueur {
    constructor(x, y, left, right, up, down, bomb) {
        this.x = x
        this.y = y
        this.width = 60
        this.color = '#00f'
        this.speed = 5
        this.leftKey = left
        this.rightKey = right
        this.upKey = up
        this.downKey = down
        this.bombKey = bomb
        this.leftKeyPressed = false
        this.rightKeyPressed = false
        this.upKeyPressed = false
        this.downKeyPressed = false
        this.bombKeyPressed = false

        document.addEventListener('keydown', (e) => {

            switch (e.key) {

                case this.leftKey:
                    this.leftKeyPressed = true
                    break;

                case this.rightKey:
                    this.rightKeyPressed = true
                    break;

                case this.upKey:
                    this.upKeyPressed = true
                    break;

                case this.downKey:
                    this.downKeyPressed = true
                    break;

                case this.bombKey:
                    this.bombKeyPressed = true
                    break;

                default:
                    break;
            }
        })

        document.addEventListener('keyup', (e) => {

            switch (e.key) {

                case this.leftKey:
                    this.leftKeyPressed = false
                    break;

                case this.rightKey:
                    this.rightKeyPressed = false
                    break;

                case this.upKey:
                    this.upKeyPressed = false
                    break;

                case this.downKey:
                    this.downKeyPressed = false
                    break;

                default:
                    break;
            }
        })
    }

    move() {

        if (this.leftKeyPressed) {
            this.x -= this.speed
            if (this.testerCollision().length)
                this.x += this.speed
        }
        if (this.rightKeyPressed) {
            this.x += this.speed
            if (this.testerCollision().length)
                this.x -= this.speed
        }
        if (this.upKeyPressed) {
            this.y -= this.speed
            if (this.testerCollision().length)
                this.y += this.speed
        }
        if (this.downKeyPressed) {
            this.y += this.speed
            if (this.testerCollision().length)
                this.y -= this.speed
        }
        var collision = this.testerCollision(false)
        collision.forEach(element => {
            if (element.type == 'fire') {
                this.color = '#000'
                clearInterval(jeu)
            }
        });

        if (this.bombKeyPressed) {
            this.bombKeyPressed = false
            for (let i = 0; i < terrain.length; i++) {
                for (let j = 0; j < terrain[i].length; j++) {
                    if (terrain[i][j].x < this.x + this.width / 2 && terrain[i][j].x + terrain[i][j].width > this.x + this.width / 2 && terrain[i][j].y < this.y + this.width / 2 && terrain[i][j].y + terrain[i][j].width > this.y + this.width / 2) {
                        terrain[i][j] = new Bloc('bomb', j, i)
                    }
                }
            }
        }
    }

    draw() {
        ctxBomber.beginPath();
        ctxBomber.fillStyle = this.color;
        ctxBomber.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, 180);
        ctxBomber.fill();
    }

    testerCollision(solid = true) {
        var choc = []
        terrain.forEach(row => {
            row.forEach(element => {
                if ((element.solid || !solid) && (this.x + this.width >= element.x && this.x <= element.x + element.width && this.y + this.width >= element.y && this.y <= element.y + element.width)) {
                    choc.push(element)
                }
            })
        });
        return choc
    }
}


var jeu

newGame()


function newGame() {
    terrainActif = terrain1
    terrain = []
    for (let i = 0; i < terrainActif.length; i++) {
        terrain.push([])
        for (let j = 0; j < terrainActif[i].length; j++) {
            terrain[i][j] = new Bloc(terrainActif[i][j], j, i)
        }

    }
    joueur = new Joueur(120, 220, 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ')
    jeu = setInterval(gameLoop, 10)
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

    joueur.move()
    joueur.draw()

}