var player = {
    x: 200,
    y: 200,
    x2: 200,
    y2: 200,
    Sz: 20,
    hitPortal: false,
    hitPortal2: false,
    state: {
        col: "black",
        col2: "white",
        gravity: "down",
        gravity2: "up",
    },
    speed: 0,
    speed2: 0,
    accel: 5,
    gravity: 0.8,
    yvel: 0,
    yvel2: 0,
    jumpHeight: 10,
    falling: true,
    falling2: true,
    respawn: {
        x: 200,
        y: 200,
        x2: 200,
        y2: 200,
    },
    reset: function () {
        this.x = player.respawn.x;
        this.y = player.respawn.y;
        this.yvel = 0;
        this.state.gravity = "down";
        this.x2 = player.respawn.x2;
        this.y2 = player.respawn.y2;
        this.yvel2 = 0;
        this.state.gravity = "down";
        this.state.gravity2 = "up";
    },
    update: function (blocks) {
        if (keys[UP_ARROW] && !this.falling) {
            if (this.state.gravity === "up") {
                this.yvel = this.jumpHeight;
            }
            if (this.state.gravity === "down") {
                this.yvel = -this.jumpHeight;
            }
        }
        if (keys[UP_ARROW] && !this.falling2) {
            if (this.state.gravity2 === "up") {
                this.yvel2 = this.jumpHeight;
            }
            if (this.state.gravity2 === "down") {
                this.yvel2 = -this.jumpHeight;
            }
        }
        if (this.yvel > 12 && this.state.gravity === "down") {
            this.yvel = 12;
        }
        if (this.yvel < -12 && this.state.gravity === "up") {
            this.yvel = -12;
        }
        if (this.yvel2 < -12 && this.state.gravity2 === "up") {
            this.yvel2 = -12;
        }
        if (this.yvel2 > 12 && this.state.gravity2 === "down") {
            this.yvel2 = 12;
        }
        if (keys[LEFT_ARROW]) {
            this.speed = -this.accel;
            this.speed2 = this.accel;
        } else if (keys[RIGHT_ARROW]) {
            this.speed = this.accel;
            this.speed2 = -this.accel;
        } else {
            this.speed = 0;
            this.speed2 = 0;
        }
        if (this.y + this.Sz > height * 2 + level.height || this.y2 - this.Sz < -height - level.height) {
            this.reset();
        }
        this.x += this.speed;
        this.x2 += this.speed2;
        this.collideWith(this.speed, 0, blocks);
        this.collideWith2(this.speed2, 0, blocks);
        this.y2 += this.yvel2;
        this.y += this.yvel;
        if (this.state.gravity === "down") {
            this.yvel += this.gravity;
        }
        if (this.state.gravity === "up") {
            this.yvel -= this.gravity;
        }
        if (this.state.gravity2 === "down") {
            this.yvel2 += this.gravity;
        }
        if (this.state.gravity2 === "up") {
            this.yvel2 -= this.gravity;
        }
        //Check for gravity on each side
        {
            if (this.y > level.height / 2) {
                this.state.gravity = "up";
            }
            if (this.y2 > level.height / 2) {
                this.state.gravity2 = "up";
            }
            if (this.y < level.height / 2) {
                this.state.gravity = "down";
            }
            if (this.y2 < level.height / 2) {
                this.state.gravity2 = "down";
            }
        }
        this.falling = true;
        this.falling2 = true;
        this.hitPortal = false;
        this.hitPortal2 = false;
        this.collideWith2(0, this.yvel2, blocks);
        this.collideWith(0, this.yvel, blocks);
    },
    collideWith: function (xv, yv, blocks, xv2, yv2) {
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (this.y + this.Sz > b.y &&
                this.y < b.y + b.Sz &&
                this.x + this.Sz > b.x &&
                this.x < b.x + b.Sz) {
                if (b.type2 === "black") {
                    switch (b.type) {
                        case "block":
                            if (this.state.gravity === "up") {
                                if (yv > 0) {
                                    this.yvel = 0;
                                    this.falling = true;
                                    this.y = b.y - this.Sz;
                                }
                                // TOP
                                if (yv < 0) {
                                    this.yvel = 0;
                                    this.falling = false;
                                    this.y = b.y + b.Sz;
                                }
                            }

                            if (this.state.gravity === "down") {
                                if (yv > 0) {
                                    this.yvel = 0;
                                    this.falling = false;
                                    this.y = b.y - this.Sz;
                                }
                                // TOP
                                if (yv < 0) {
                                    this.yvel = 0;
                                    this.falling = true;
                                    this.y = b.y + b.Sz;
                                }
                            }
                            // RIGHT
                            if (xv > 0) {
                                this.speed = 0;
                                this.x = b.x - this.Sz;
                            }
                            // LEFT
                            if (xv < 0) {
                                this.speed = 0;
                                this.x = b.x + b.Sz;
                            }
                            break;
                        case "portal":
                            this.hitPortal = true;
                            break;
                        case "death":
                            this.reset();
                            break;
                        case "trampoline":
                            if (yv > 0) {
                                this.yvel = -14;
                                this.y = b.y - this.Sz;
                            }
                            if (yv < 0) {
                                this.yvel = 14;
                                this.y = b.y + b.Sz;
                            }
                            if (xv > 0) {
                                this.speed2 = 0;
                                this.x = b.x - this.Sz;
                            }
                            // LEFT
                            if (xv < 0) {
                                this.speed2 = 0;
                                this.x = b.x + b.Sz;
                            }
                            break;
                    }
                }

            }
        }
    },
    collideWith2: function (xv, yv, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (this.y2 + this.Sz > b.y &&
                this.y2 < b.y + b.Sz &&
                this.x2 + this.Sz > b.x &&
                this.x2 < b.x + b.Sz) {
                if (b.type2 === "white") {
                    switch (b.type) {
                        case "block":
                            if (this.state.gravity2 === "up") {
                                if (yv > 0) {
                                    this.yvel2 = 0;
                                    this.falling2 = true;
                                    this.y2 = b.y - this.Sz;
                                }
                                // TOP
                                if (yv < 0) {
                                    this.yvel2 = 0;
                                    this.falling2 = false;
                                    this.y2 = b.y + b.Sz;
                                }
                            }

                            if (this.state.gravity2 === "down") {
                                if (yv > 0) {
                                    this.yvel2 = 0;
                                    this.falling2 = false;
                                    this.y2 = b.y - this.Sz;
                                }
                                // TOP
                                if (yv < 0) {
                                    this.yvel2 = 0;
                                    this.falling2 = true;
                                    this.y2 = b.y + b.Sz;
                                }
                            }
                            // RIGHT
                            if (xv > 0) {
                                this.speed2 = 0;
                                this.x2 = b.x - this.Sz;
                            }
                            // LEFT
                            if (xv < 0) {
                                this.speed2 = 0;
                                this.x2 = b.x + b.Sz;
                            }
                            break;
                        case "portal":
                            this.hitPortal2 = true;
                            break;
                        case "death":
                            this.reset();
                            break;
                        case "trampoline":
                            if (yv > 0) {
                                this.yvel2 = -14;
                                this.falling2 = true;
                                this.y2 = b.y - this.Sz;
                            }
                            if (yv < 0) {
                                this.yvel2 = 14;
                                this.falling2 = true;
                                this.y2 = b.y + b.Sz;
                            }
                            if (xv > 0) {
                                this.speed2 = 0;
                                this.x2 = b.x - this.Sz;
                            }
                            // LEFT
                            if (xv < 0) {
                                this.speed2 = 0;
                                this.x2 = b.x + b.Sz;
                            }
                            break;
                    }
                }
            }
        }
    },
    sho: function () {
        if (level.value < worldMap.length - 1) {
            {

                noStroke();
                blendMode(DIFFERENCE);
                fill(255);
                rect(this.x - 5, this.y - 5, this.Sz + 10, this.Sz + 10);
                blendMode(BLEND);
                fill(0);
                rect(this.x, this.y, this.Sz, this.Sz);
                fill(255);
                ellipse(this.x + this.speed + this.Sz / 2, this.y + this.Sz / 2, 10, 10);
            }
            {
                noStroke();
                blendMode(DIFFERENCE);
                fill(255);
                rect(this.x2 - 5, this.y2 - 5, this.Sz + 10, this.Sz + 10);
                blendMode(BLEND);
                fill(255);
                rect(this.x2, this.y2, this.Sz, this.Sz);
                fill(0);
                ellipse(this.x2 + this.speed2 + this.Sz / 2, this.y2 + this.Sz / 2, 10, 10);
            }
        }
    },
};
