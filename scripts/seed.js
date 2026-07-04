require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

const { team_members, publications, activities, multimedia, about_us } = require('../model/model');

const placeholderImg = fs.readFileSync(path.join(__dirname, '../public/images/placeholder.png'));

async function seed() {
    await Promise.all([
        team_members.deleteMany({}),
        publications.deleteMany({}),
        activities.deleteMany({}),
        multimedia.deleteMany({}),
        about_us.deleteMany({}),
    ]);

    await about_us.create({
        objectives: 'Desenvolver tecnologias inovadoras de interface cérebro-máquina, promover a investigação interdisciplinar em neurociência computacional e contribuir para o avanço do diagnóstico e tratamento de doenças neurológicas.',
        mission: 'A missão do BRaNT é liderar investigação de excelência na intersecção entre neurociência e tecnologia, formando investigadores de topo e criando soluções com impacto real na sociedade.',
        structural_org: 'O grupo está organizado em três núcleos: Neuroimagem e Sinal, Interfaces Cérebro-Máquina e Neurotecnologia Clínica. Cada núcleo é liderado por um investigador sénior e integra doutorandos e bolseiros de investigação.',
        about: 'BRaNT — Brain Research and Neurotechnology — é um grupo de investigação multidisciplinar dedicado ao estudo do cérebro e ao desenvolvimento de tecnologias aplicadas à neurociência.',
        address: 'Campus Universitário da Penteada, 9020-105 Funchal, Madeira, Portugal',
        email: 'brant@uma.pt',
        phone1: '+351 291 705 000',
        phone2: '+351 291 705 001',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
    });

    await team_members.insertMany([
        {
            name: 'Prof. Rui Câmara',
            area: 'Neuroimagem e Sinal',
            email: 'rui.camara@uma.pt',
            about: 'Investigador Principal do grupo BRaNT. Doutorado em Engenharia Biomédica pela Universidade de Lisboa. Especialista em processamento de sinal EEG e interfaces cérebro-máquina.',
            phone: '+351 291 705 010',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
        {
            name: 'Dra. Sofia Mendonça',
            area: 'Neurotecnologia Clínica',
            email: 'sofia.mendonca@uma.pt',
            about: 'Investigadora sénior com foco em aplicações clínicas de neuroimagem funcional. Doutorada em Neurociência Cognitiva pela Universidade do Porto.',
            phone: '+351 291 705 011',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
        {
            name: 'Dr. Miguel Freitas',
            area: 'Interfaces Cérebro-Máquina',
            email: 'miguel.freitas@uma.pt',
            about: 'Investigador especializado em sistemas BCI não-invasivos. Doutorado em Ciências da Computação com especialização em aprendizagem automática aplicada a sinais neurais.',
            phone: '+351 291 705 012',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
        {
            name: 'Ana Rodrigues',
            area: 'Neuroimagem e Sinal',
            email: 'ana.rodrigues@uma.pt',
            about: 'Doutoranda em Engenharia Biomédica. Investiga técnicas de análise de conectividade funcional em redes neuronais utilizando fMRI e EEG.',
            phone: '+351 291 705 013',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
        {
            name: 'Carlos Vieira',
            area: 'Interfaces Cérebro-Máquina',
            email: 'carlos.vieira@uma.pt',
            about: 'Bolseiro de investigação. Desenvolve algoritmos de classificação de padrões EEG para controlo de próteses robóticas. Licenciado em Engenharia Eletrónica.',
            phone: '+351 291 705 014',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
        {
            name: 'Inês Baptista',
            area: 'Neurotecnologia Clínica',
            email: 'ines.baptista@uma.pt',
            about: 'Investigadora em neuroreabilitação. Estuda a aplicação de estimulação transcraniana por corrente contínua (tDCS) em doentes com acidente vascular cerebral.',
            phone: '+351 291 705 015',
            country: 'Portugal',
            img: { data: placeholderImg, contentType: 'image/png' },
        },
    ]);

    await publications.insertMany([
        {
            title: 'Real-Time EEG-Based Motor Imagery Classification Using Convolutional Neural Networks',
            authors: 'Freitas, M., Câmara, R., Rodrigues, A.',
            type: 'Journal Article',
            date: '2024',
            abstract: 'Este trabalho apresenta um sistema de classificação de imaginação motora em tempo real utilizando redes neuronais convolucionais aplicadas a sinais EEG. O sistema atinge uma precisão média de 87.3% em quatro classes de movimento, superando os métodos clássicos baseados em CSP.',
            url: 'https://doi.org/10.1000/brant.2024.001',
        },
        {
            title: 'Functional Connectivity Alterations in Parkinson\'s Disease: A Resting-State fMRI Study',
            authors: 'Mendonça, S., Baptista, I., Câmara, R.',
            type: 'Journal Article',
            date: '2024',
            abstract: 'Analisámos padrões de conectividade funcional em repouso em 42 doentes com Doença de Parkinson comparativamente a 38 controlos saudáveis, identificando alterações significativas nas redes frontoestriatal e cerebelar.',
            url: 'https://doi.org/10.1000/brant.2024.002',
        },
        {
            title: 'A Low-Cost EEG Acquisition System for Brain-Computer Interface Applications',
            authors: 'Vieira, C., Freitas, M., Rodrigues, A.',
            type: 'Conference Paper',
            date: '2023',
            abstract: 'Propomos um sistema de aquisição EEG de baixo custo baseado em hardware open-source, validado em tarefas de imaginação motora e P300, com desempenho comparável a sistemas comerciais de alta gama.',
            url: 'https://doi.org/10.1000/brant.2023.003',
        },
        {
            title: 'tDCS-Enhanced Motor Rehabilitation in Stroke Patients: A Randomized Controlled Trial',
            authors: 'Baptista, I., Mendonça, S., Câmara, R.',
            type: 'Journal Article',
            date: '2023',
            abstract: 'Ensaio clínico aleatorizado que avalia o efeito da estimulação transcraniana por corrente contínua combinada com fisioterapia convencional na recuperação motora pós-AVC. Observou-se melhoria significativa no grupo de intervenção ao fim de 8 semanas.',
            url: 'https://doi.org/10.1000/brant.2023.004',
        },
        {
            title: 'Deep Learning Approaches for Epileptic Seizure Detection from EEG Signals',
            authors: 'Rodrigues, A., Freitas, M., Câmara, R.',
            type: 'Conference Paper',
            date: '2022',
            abstract: 'Comparámos três arquiteturas de aprendizagem profunda — CNN, LSTM e Transformer — para deteção automática de crises epiléticas em registos EEG de longa duração, obtendo sensibilidade de 94.1% e especificidade de 91.7%.',
            url: 'https://doi.org/10.1000/brant.2022.005',
        },
    ]);

    await activities.insertMany([
        {
            title: 'Workshop em Interfaces Cérebro-Máquina',
            participations: 'Prof. Rui Câmara, Dr. Miguel Freitas, Ana Rodrigues',
            abstract: 'Workshop intensivo de dois dias sobre sistemas BCI não-invasivos, destinado a estudantes de mestrado e doutoramento. Incluiu sessões práticas de aquisição e processamento de sinal EEG.',
            date: '2024-03-15',
            url: 'https://uma.pt/eventos/bci-workshop-2024',
        },
        {
            title: 'Seminário: Neurociência e Inteligência Artificial',
            participations: 'Dra. Sofia Mendonça, Carlos Vieira',
            abstract: 'Seminário aberto à comunidade académica sobre a interseção entre neurociência computacional e inteligência artificial. Foram apresentados os projetos em curso no grupo BRaNT.',
            date: '2024-01-20',
            url: 'https://uma.pt/eventos/neuro-ia-2024',
        },
        {
            title: 'Participação na IEEE EMBC 2023',
            participations: 'Prof. Rui Câmara, Dr. Miguel Freitas, Inês Baptista',
            abstract: 'O grupo BRaNT participou na IEEE Engineering in Medicine and Biology Conference 2023 em Sydney, com apresentação de dois artigos científicos e um poster.',
            date: '2023-07-24',
            url: 'https://embc.embs.org/2023',
        },
        {
            title: 'Visita de Estudo ao Hospital Dr. Nélio Mendonça',
            participations: 'Dra. Sofia Mendonça, Inês Baptista, Ana Rodrigues',
            abstract: 'Visita de estudo ao serviço de Neurologia do Hospital Dr. Nélio Mendonça, no âmbito da colaboração para o projeto de neuroreabilitação pós-AVC. Foram apresentados os resultados preliminares do ensaio clínico.',
            date: '2023-11-08',
            url: '',
        },
    ]);

    await multimedia.insertMany([
        {
            title: 'BRaNT — Apresentação do Grupo de Investigação',
            description: 'Vídeo institucional do grupo BRaNT onde são apresentados os principais projetos de investigação, infraestruturas laboratoriais e equipa científica.',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
            title: 'Demo: Sistema BCI para Controlo de Prótese Robótica',
            description: 'Demonstração do sistema de interface cérebro-máquina desenvolvido no BRaNT para controlo de uma prótese de mão robótica através de imaginação motora.',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
            title: 'Entrevista: tDCS na Reabilitação Pós-AVC',
            description: 'Entrevista à Dra. Sofia Mendonça e Inês Baptista sobre os resultados do estudo clínico com estimulação transcraniana em doentes com acidente vascular cerebral.',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
    ]);

    console.log('Base de dados preenchida com sucesso!');
    mongoose.disconnect();
}

seed().catch(err => { console.error(err); mongoose.disconnect(); });
