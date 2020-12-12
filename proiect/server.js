const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize('virtualBook', 'root', 'Teodora17416', {
  dialect: 'mysql'
})
const app = express()
app.use(cors())
app.use(bodyParser.json())

const Login = sequelize.define('login', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
     len:[15,40],
    },
    primaryKey:true
  },
  parola: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 16]
    }
  },
  idStudent: {
   type: Sequelize.INTEGER,
   allowNull: false
 }
})

const Student = sequelize.define('student', {

 idStudent: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey:true,
  autoIncrement:true,
}, 
 nume: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  prenume: {
   type: Sequelize.STRING,
   allowNull: false,
   validate: {
     len: [1, 70]
   }
 },
dataNasterii:{
 type: Sequelize.DATE,
 allowNull: false
},
email: {
 type: Sequelize.STRING,
 allowNull: false,
 validate: {
  len:[15,40]
 }
},
idFacultate:{
 type: Sequelize.INTEGER,
 allowNull: false,
}})

const University = sequelize.define('university', {
 idFacultate: {
   type: Sequelize.INTEGER,
   allowNull:false,
   primaryKey:true,
   autoIncrement:true
   },
 numeFacultate :{
   type: Sequelize.STRING,
   allowNull: false,
   validate: {
     len: [3, 20]
   }
 }
})

const Subject=sequelize.define('subject', {
 idMaterie: {
   type: Sequelize.INTEGER,
   allowNull:false,
   primaryKey:true,
   autoIncrement:true
   },
 numeMaterie :{
   type: Sequelize.STRING,
   allowNull: false,
   validate: {
     len: [3, 30]
   }
 }
})

const Note=sequelize.define('note', {
 idNotita: {
   type: Sequelize.INTEGER,
   allowNull:false,
   primaryKey:true,
   autoIncrement:true
   },
 titlu :{
   type: Sequelize.STRING,
   },
 continut : {
  type: Sequelize.STRING,
  },
  idMaterie:{
   type: Sequelize.INTEGER,
  }
})

//LEGARE TABELE
//Legare tabela Student de Login 1:1
Login.belongsTo(Student,{foreignKey:'idStudent'});
Student.hasOne(Login,{foreignKey:'idStudent'});

//Legare tabela University de Student 1:M
University.hasMany(Student,{foreignKey:'idFacultate'});
Student.belongsTo(University,{foreignKey:'idFacultate'});

//Legare tabela Notite de Materii 1:M
Subject.hasMany(Note,{foreignKey:'idMaterie'});
Note.belongsTo(Subject,{foreignKey:'idMaterie'});


//CREARE TABELE
app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

//SELECTARE INREGISTRARI TABELE

//Returneaza toti studentii
app.get('/students', async (req, res, next) => {
  const query = {
    where: {}
   }

  try {
    const students = await Student.findAll(query)
    res.status(200).json(students)
  } catch (err) {
    next(err)
  }
})
//facultati
app.get('/universities', async (req, res, next) => {
 const query = {
   where: {}
  }

 try {
   const universities = await University.findAll(query)
   res.status(200).json(universities)
 } catch (err) {
   next(err)
 }
})
//conturi
app.get('/logins', async (req, res, next) => {
 const query = {
   where: {}
  }

 try {
   const logins = await Login.findAll(query)
   res.status(200).json(logins)
 } catch (err) {
   next(err)
 }
})

//materii
app.get('/subjects', async (req, res, next) => {
 const query = {
   where: {}
  }

 try {
   const subjects = await Subject.findAll(query)
   res.status(200).json(subjects)
 } catch (err) {
   next(err)
 }
})
//Notite
app.get('/notes', async (req, res, next) => {
 const query = {
   where: {}
  }

 try {
   const notes = await Note.findAll(query)
   res.status(200).json(notes)
 } catch (err) {
   next(err)
 }
})



//ADAUGARE INREGISTRARI IN TABELE
//Adauga o inregistrare in tabela studenti 
app.post('/students', async (req, res, next) => {
  try {
    await Student.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})
//Adauga o inregistrare in tabela login 
app.post('/login', async (req, res, next) => {
 try {
   await Login.create(req.body)
   res.status(201).json({ message: 'created' })
 } catch (err) {
   next(err)
 }
})

//facultati
app.post('/universities', async (req, res, next) => {
 try {
   await University.create(req.body)
   res.status(201).json({ message: 'created' })
 } catch (err) {
   next(err)
 }
})
//materii
app.post('/subjects', async (req, res, next) => {
 try {
   await Subject.create(req.body)
   res.status(201).json({ message: 'created' })
 } catch (err) {
   next(err)
 }
})
//notite
app.post('/notes', async (req, res, next) => {
 try {
   await Note.create(req.body)
   res.status(201).json({ message: 'created' })
 } catch (err) {
   next(err)
 }
})

//IDENTIFICARE PE BAZA ID-ULUI
//studenti
app.get('/students/:studid', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studid)
    if (student) {
      res.status(200).json(student)
    } else {
      res.status(404).json({ message: 'not found '})
    }
  } catch (err) {
    next(err)
  }
})

//facultate
app.get('/universities/:facid', async (req, res, next) => {
 try {
   const university = await University.findByPk(req.params.facid)
   if (university) {
     res.status(200).json(university)
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})

//Login
//logid=email
app.get('/logins/:logid', async (req, res, next) => {
 try {
   const login = await Login.findByPk(req.params.logid)
   if (login) {
     res.status(200).json(login)
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})

//Materii
app.get('/subjects/:subid', async (req, res, next) => {
 try {
   const subject = await Subject.findByPk(req.params.subid)
   if (subject) {
     res.status(200).json(subject)
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})
//Notite
app.get('/notes/:notid', async (req, res, next) => {
 try {
   const note = await Note.findByPk(req.params.notid)
   if (note) {
     res.status(200).json(note)
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})

//ACTUALIZARI ALE INREGISTRARILOR DIN TABELE 
app.put('/students/:studid', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studid)
    if (student) {
      await student.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found'})
    }
  } catch (err) {
    next(err)
  }
})
//facultate
app.put('/universities/:facid', async (req, res, next) => {
 try {
   const university = await University.findByPk(req.params.facid)
   if (university) {
     await university.update(req.body)
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found'})
   }
 } catch (err) {
   next(err)
 }
})

//login
app.put('/logins/:logid', async (req, res, next) => {
 try {
   const login = await Login.findByPk(req.params.logid)
   if (login) {
     await login.update(req.body)
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found'})
   }
 } catch (err) {
   next(err)
 }
})

//Materii
app.put('/subjects/:subid', async (req, res, next) => {
 try {
   const subject = await Subject.findByPk(req.params.subid)
   if (subject) {
     await subject.update(req.body)
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found'})
   }
 } catch (err) {
   next(err)
 }
})

//Notite
app.put('/notes/:notid', async (req, res, next) => {
 try {
   const note = await Student.findByPk(req.params.notid)
   if (note) {
     await note.update(req.body)
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found'})
   }
 } catch (err) {
   next(err)
 }
})

//STERGERI DIN TABELE
app.delete('/students/:studid', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studid)
    if (student) {
      await student.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found '})
    }
  } catch (err) {
    next(err)
  }
})

//facultate
app.delete('/universities/:facid', async (req, res, next) => {
 try {
   const university = await University.findByPk(req.params.facid)
   if (university) {
     await university.destroy()
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})

//login
app.delete('/logins/:logid', async (req, res, next) => {
 try {
   const login = await Login.findByPk(req.params.logid)
   if (login) {
     await login.destroy()
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})

//materii
app.delete('/subjects/:subid', async (req, res, next) => {
 try {
   const subject = await Subject.findByPk(req.params.subid)
   if (subject) {
     await subject.destroy()
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})
//notite
app.delete('/notes/:notid', async (req, res, next) => {
 try {
   const note = await Note.findByPk(req.params.notid)
   if (note) {
     await note.destroy()
     res.status(202).json({ message: 'accepted' })
   } else {
     res.status(404).json({ message: 'not found '})
   }
 } catch (err) {
   next(err)
 }
})




//selecteaza studentii dintr-o anumita facultate
app.get('/universities/:facid/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.facid, {
      include: [ Student ]
    })
    if (university) {
      res.status(200).json(university.students)
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})

//adaugam notite intr-o anumita materie
app.post('/subjects/:subid/notes', async (req, res, next) => {
  try {
    const subject = await Subject.findByPk(req.params.subid)
    if (subject) {
      const note = new Note(req.body)
      note.subject = subject.idMaterie
      await note.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
//Vizualizam notitele inserate intr-o anumita materie
app.get('/subjects/:subid/notes', async (req, res, next) => {
  try {
    const subject = await Subject.findByPk(req.params.subid, {
      include: [ Note ]
    })
    if (subject) {
      res.status(200).json(subject.notes)
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})

//Selectam o anumita notita dintr-o anumita materie , pe baza id-urilor
app.get('/subjects/:subid/notes/:notid', async (req, res, next) => {
  try {
    const subject = await Subject.findByPk(req.params.subid)
    if (subject) {
      const notes = await subject.getNotes({
        idNotita: req.params.notid
      })
      const note = await Note.findByPk(req.params.notid)
      if (note) {
        res.status(200).json(note)
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})
//editam o anumita notita 
app.put('/subjects/:subid/notes/:notid', async (req, res, next) => {
  try {
    const subject = await Subject.findByPk(req.params.subid)
    if (subject) {
      const notes = await subject.getNotes({
        idNotita: req.params.notid
      })

      const note = await Note.findByPk(req.params.notid)

      if (note) {
        note.titlu = req.body.titlu
        note.continut = req.body.continut

        await note.save()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})

//Editare detalii studenti
app.put('/students/:studid', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studid)
    if (student) {
      await student.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found'})
    }
  } catch (err) {
    next(err)
  }
})

//Stergere notita pe baza id-ului
app.delete('/subjects/:subid/notes/:notid', async (req, res, next) => {
  try {
    const subject = await Subject.findByPk(req.params.subid)
    if (subject) {
      const notes = await subject.getNotes({
        idNotita: req.params.notId
      })
      const note = await Note.findByPk(req.params.notid)
      if (note) {
        await note.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found '})
      }
    } else {
      res.status(404).json({ message: 'not found '})
    }    
  } catch (err) {
    next(err)
  }
})

// get /notes?filter=litera
//notes?filter=A&page=1&pageSize=3
app.get('/notes', async (req, res, next) => {
  const query = {
    where: {}
  }
  if (req.query.filter) {
    query.where.titlu = {
      [Op.like]:`%${req.query.filter}%`
    }
  }

  try {
    const notes = await Note.findAll(query)
    res.status(200).json(notes)
  } catch (err) {
    next(err)
  }
})



app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)