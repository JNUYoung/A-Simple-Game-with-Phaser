// 创建场景
// 每一个phaser项目都由场景构成
class mainScene {
    // preload方法会在一开始就被调用，该方法加载所有的assets资源
    preload() {
        // 添加游戏角色，sprite的名称，sprite的路径
        this.load.image('snowman', './assets/snowman.png')
        // 添加蛋糕
        this.load.image('cake', './assets/cake.png')
    }
    // create方法在preload方法调用后执行，初始化游戏场景，例如sprites的位置等
    create() {
        // 在屏幕中展示雪人，x坐标，y坐标，sprite name
        this.snowman = this.physics.add.sprite(100, 100, 'snowman')
        // 在屏幕中展示蛋糕
        this.cake = this.physics.add.sprite(300, 300, 'cake')
        
        // 添加游戏分数展示
        this.score = 0  // 初始分数
        const style = {
            font: '20px Arial',
            fill: '#fff'
        }  // 文本的样式
        // 将游戏分数添加到场景中
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style)

        // 使用方向键作为输入，通过this.arrow获取按键输入信息，从而改变雪人位置
        this.arrow = this.input.keyboard.createCursorKeys()
    }
    // update方法在create方法调用后执行，每秒被调用60次，处理游戏的所有逻辑
    update() {
        // 当雪人和蛋糕重叠时，调用eat方法
        if (this.physics.overlap(this.snowman, this.cake)) {
            this.eat()
        }

        // 控制雪人的移动
        // 水平移动
        if (this.arrow.right.isDown) {
            this.snowman.x += 3
        } else if (this.arrow.left.isDown) {
            this.snowman.x -= 3
        }

        // 垂直移动
        if (this.arrow.up.isDown) {
            this.snowman.y -= 3
        } else if (this.arrow.down.isDown) {
            this.snowman.y += 3
        }
    }

    // 当雪人吃到蛋糕时，随机重置蛋糕的位置，并且分数+10
    eat() {
        // 当雪人吃到蛋糕时，让雪人的大小短暂变大
        this.tweens.add({
            targets: this.snowman,
            duration: 200,
            scaleX: 1.5,
            scaleY: 1.5,
            yoyo: true  // 恢复原始缩放
        })

        // 随机改变蛋糕的位置
        this.cake.x = Phaser.Math.Between(100, 600)
        this.cake.y = Phaser.Math.Between(100, 300)
        // 增加已获得的分数
        this.score += 10
        // 显示更新后的分数
        this.scoreText.setText('score: ' + this.score)
    }
}





/**
 * 在js文件的最后，通过Phaser.Game()方法来启动游戏
 * 通过传入一个对象来设置可选的参数
 */
new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade'},    // 使用的物理引擎
    parent: 'game'    // 在id为game的div标签中创建游戏
})