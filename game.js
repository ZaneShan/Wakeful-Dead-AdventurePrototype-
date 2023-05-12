class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "The year is 20X9.").setFontSize(100);
        this.add.text(50,200, "The world is in ruins.").setFontSize(50);
        this.add.text(50,1000, "Continue").setFontSize(50);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('oproom'));
        });

    }
}

class oproom extends AdventureScene {
    constructor() {
        super("oproom", "Operating Room");
    }

    onEnter() {
        this.add.text(this.w * 0.025,this.w * 0.05,"You wake up.",
        {
            font: "50px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
        this.add.text(this.w * 0.025,this.w * 0.1,"Opening your eyes, you discover yourself cold and alone, \nand are greeted by the flickering fluorescent white light above you. ",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
        this.add.text(this.w * 0.025,this.w * 0.15,"the smell of sanitary rot permeates through your lungs \nas you steady yourself off the operating table.",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });

        let door1 = this.add.text(this.w * 0.025, this.w * 0.4, "Door")
            .setFontSize(this.s * 2)
            .setInteractive()
        this.click(door1, 'hall') //dsl requirement, eliminate pointdown on non conditionals
        this.describe(door1, "Stumble into the hall"); //dsl requirement, eliminates pointerover on non conditionals
    }
}

class hall extends AdventureScene {
    constructor() {
        super("hall", "Long, narrow hallway.");
    }
    onEnter() {
        this.add.text(this.w * 0.025,this.w * 0.1,"Each step on the cold, wet floor sends chills through your nerves.",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
        this.add.text(this.w * 0.025,this.w * 0.15,"There are three doors stretched through this hall, each labeled with jet black text. \nIn order, they are: Janitors Closet, Security, and Exit. ",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
       let jandoor = this.add.text(this.w * 0.025, this.w * 0.4, "Janitors Closet")
            .setFontSize(this.s * 2)
            .setInteractive()
        this.click(jandoor, 'janitor');
        this.describe(jandoor,  "The doorknob chills your hands before you even touch it"); //dsl requirement, eliminates pointerover
        
        let secdoor = this.add.text(this.w * 0.42, this.w * 0.4, "Barred door to security")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("🦯")) {
                    this.showMessage("Crowbar should make quick work of this.");
                } else {
                    this.showMessage("It's barred tight.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("🦯")) {
                    this.loseItem("🦯");
                    this.showMessage("*CRACK*");
                    secdoor.setText("Security door");
                    this.gotoScene('security');
                }
        })
        let exitdoor = this.add.text(this.w * 0.3, this.w * 0.5, "Exit Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("💳")) {
                    this.showMessage("Keycard should work here.");
                } else {
                    this.showMessage("Door seems to be locked by a security panel on its left");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("💳")) {
                    this.loseItem("💳");
                    this.showMessage("*DING*");
                    secdoor.setText("Exit Door");
                    this.gotoScene('outro');
                }
        })
    }
}

class janitor extends AdventureScene {
    constructor() {
        super("janitor", "Musty Janitors Closet");
    }
    onEnter() {
        this.add.text(this.w * 0.025,this.w * 0.1,"Turning on the yellow lightbulb in this claustrophobic closet, \nparticles of dust are illuminated and send your lungs hacking.",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
        this.add.text(this.w * 0.025,this.w * 0.15,"It is evident this place has not seen light in a very long time.",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });

        let crowbar = this.add.text(this.w * 0.5, this.w * 0.1, "🦯 Crowbar")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerdown', () => {
            this.showMessage("You pick up the crowbar.");
            this.gainItem('🦯');
            this.tweens.add({
                targets: crowbar,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => crowbar.destroy()
            });
        })
        this.describe(crowbar,  "Sturdy, Reliable.");

        let exit = this.add.text(this.w * 0.025, this.w * 0.4, "Exit")
            .setFontSize(this.s * 2)
            .setInteractive()
        this.click(exit, 'hall')
        this.describe(exit,  "Back to the hall")
    }
}

class security extends AdventureScene {
    constructor() {
        super("security", "Security Room");
    }
    onEnter() {
        this.add.text(this.w * 0.025,this.w * 0.1,"The smell here is awful.",
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });
        this.add.text(this.w * 0.025,this.w * 0.15, "Looking around, you discover the smell emanating from a rotting corpse, \na security guard who must have barricaded himself inside. \nIn his skinny, dessicated hands, is a key card.", 
        {
            font: "30px Georgia",
            color: "#FFFFFF",
            alpha: 0,
        });

        let keycard = this.add.text(this.w * 0.5, this.w * 0.1, "💳 Keycard")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerdown', () => {
            this.showMessage("You pick up the keycard.");
            this.gainItem('💳');
            this.tweens.add({
                targets: keycard,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => keycard.destroy()
            });
        })
        this.describe(keycard,  "Made out of flexible plastic.");

        let exit = this.add.text(this.w * 0.025, this.w * 0.4, "Exit")
            .setFontSize(this.s * 2)
            .setInteractive()
        this.click(exit, 'hall')
        this.describe(exit,  "Back to the hall")
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "You slide the keycard, and open the door").setFontSize(50);
        this.add.text(50, 100, "A shade of orange washes over you, and the setting sun invigorates you with energy, rewarding you of your escape. \nBut now that the night is setting, creatures of the night are sure to come out. \nHow will you survive this night?.").setFontSize(20);
        this.add.text(50, 1000, "END").setFontSize(100);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, oproom, hall, janitor, security, Outro],
    title: "Adventure Game",
});

