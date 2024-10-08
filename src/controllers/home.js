const aluno = require('../model/aluno');
const sala = require('../model/sala');

module.exports = {
    
    async pagInicialGet(req, res){

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Foto']
        });
        
        res.render('../view/index', { salas, alunos, id: '' });

    },

    async pagInicialPost(req, res) {

        const id = req.body.nome;
    
        const alunos = await aluno.findAll({
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Foto'],
            where: { IDSala: id }
        });
    
        const salas = await sala.findAll({ 
            raw: true, 
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        res.render('../view/index.ejs', { salas, alunos, id }); 
    }
}