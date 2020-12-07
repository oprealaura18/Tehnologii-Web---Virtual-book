class Robot {
  constructor(name)
{
  this.name=name;
}
move()
{
  console.log(`${this.name} is moving `)
}
}

const r0 = new Robot('ordinary robot')
r0.move()

class Weapon{
  constructor(description){
    this.description=description;
  }
  fire(){
    console.log(`${this.description} is fireing`)
  }
}

class CombatRobot extends Robot{
  constructor (name) {
    super(name)
    this.weapons = []
 }

 addWeapon (weapon) {
   this.weapons.push(weapon)
 }

 fire () {
   console.log(`firing all weapons`)
   for (const weapon of this.weapons) {
     weapon.fire()
   }
 }
}

const cr0 = new CombatRobot('combat robot')
cr0.fire()
cr0.move()

const w0 = new Weapon('pew pew laser')
cr0.addWeapon(w0)
cr0.fire()

Robot.prototype.fly=function(){
  console.log(`${this.name} is flying`);
}

cr0.fly()

let f0=r0.fly

f0.apply(r0)

let f1=f0.bind(cr0)
f1()
