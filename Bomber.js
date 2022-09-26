var canvasBomber = document.getElementById('bomber')
canvasBomber.width = canvasBomber.clientWidth
canvasBomber.height = canvasBomber.clientHeight
var ctxBomber = canvasBomber.getContext('2d')


terrain1 = [
    'terrain', 'block', 'terrain', 'block', 'terrain',
    'vide', 'block', 'block', 'block', 'block',
    'terrain', 'block', 'terrain', 'block', 'terrain',
    'block', 'block', 'block', 'block', 'block',
]


class Bloc {
    constructor(type, x, y) {
        this.type = type
        this.width = 100
        this.x = x * this.width + 100
        this.y = y * this.width + 50
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
                this.solid = true
                break;

            case 'vide':
                this.color = '#fff'
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
            ctxBomber.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, 180);
        }
        ctxBomber.fill();
    }
}

class Joueur {
    constructor(x, y, left, right, up, down) {
        this.x = x
        this.y = y
        this.width = 60
        this.color = '#00f'
        this.speed = 2
        this.leftKey = left
        this.rightKey = right
        this.upKey = up
        this.downKey = down
        this.leftKeyPressed = false
        this.rightKeyPressed = false
        this.upKeyPressed = false
        this.downKeyPressed = false

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
            if (this.testerCollision())
                this.x += this.speed
        }
        if (this.rightKeyPressed) {
            this.x += this.speed
            if (this.testerCollision())
                this.x -= this.speed
        }
        if (this.upKeyPressed) {
            this.y -= this.speed
            if (this.testerCollision())
                this.y += this.speed
        }
        if (this.downKeyPressed) {
            this.y += this.speed
            if (this.testerCollision())
                this.y -= this.speed
        }
    }

    draw() {
        ctxBomber.beginPath();
        ctxBomber.fillStyle = this.color;
        ctxBomber.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, 180);
        ctxBomber.fill();
    }

    testerCollision() {
        var choc = false
        terrain.forEach(row => {
            row.forEach(element => {
                if (element.solid && (this.x + this.width >= element.x && this.x <= element.x + element.width && this.y + this.width >= element.y && this.y <= element.y + element.width))
                    choc = true
            })
        });
        return choc
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
    joueur = new Joueur(20, 120, 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
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