import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import './style.css';
import Input from '../../components/input';
import warnigIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm () {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItens, setscheduleItens] = useState([
        { week_day:0, from:'', to:'' },
    ])
    
    function addNewScheduleItem() {
        setscheduleItens([
            ...scheduleItens, {week_day:0, from:'', to:''}
        ])
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(()=> {
            alert("Cadastro realizado com sucesso!");
            history.push('/')
        }).catch(()=>{
            alert("Erro no cadastro..");
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItens.map((scheduleItem, index) => {
            if (index === position) {
                return{ ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setscheduleItens(newArray);
    }
    return (
        <div id="page-teacher-form" className="container">
        <PageHeader 
            title="Que incrivel que você quer das aulas." 
            description="O primeiro passo é preencher esse formulario de inscrição."
        />
        
        <main>
            <form onSubmit={handleCreateClass}>
            <fieldset>
                <legend>Seus Dados</legend>
                <Input name="name" label="Nome Completo" value={name} onChange={(e) => { setName(e.target.value) }}/>
                <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }}/>
                <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }}/>
                <Textarea name="bio" label= "Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }}/>
            </fieldset>

            <fieldset>
                <legend>Sobre a aula</legend>
                <Select value={subject} onChange={(e) => { setSubject(e.target.value) }}
                name="subject" label="Matéria" options={[
                    { value: 'Artes', label: 'Artes'},
                    { value: 'Biologia', label: 'Biologia'},
                    { value: 'Ciencias', label: 'Ciencias'},
                    { value: 'Educação fisica', label: 'Educação fisica'},
                    { value: 'Fisica', label: 'Fisica'},
                    { value: 'Geografia', label: 'Geografia'},
                    { value: 'Historia', label: 'Historia'},
                    { value: 'Matematica', label: 'Matematica'},
                    { value: 'Portugues', label: 'Portugues'},
                    { value: 'Quimica', label: 'Quimica'}
                ]}/>
                <Input name="avcostatar" label="Custo da sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }}/>
            </fieldset>

            <fieldset>
                <legend>
                    Horários Disponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                    + Novo Horario
                    </button>
                </legend>
                
                {scheduleItens.map((scheduleItem, index) => {
                    return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                            <Select value={scheduleItem.week_day} onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value) }
                            name="week_day" label="Dia da Semana" options={[
                                { value: '0', label: 'Domingo'},
                                { value: '1', label: 'Segunda'},
                                { value: '2', label: 'Terça'},
                                { value: '3', label: 'Quarta'},
                                { value: '4', label: 'Quinta'},
                                { value: '5', label: 'Sexta'},
                                { value: '6', label: 'Sabado'},
                            ]}/>
                        <Input name="from" label="Inicio" type="time" value={scheduleItem.from} onChange={(e) => setScheduleItemValue(index, 'from', e.target.value) }/>
                        <Input name="to" label="Fim" type="time" value={scheduleItem.to} onChange={(e) => setScheduleItemValue(index, 'to', e.target.value) } />

                        </div>
                    )
                })}
            </fieldset>

            <footer>
                <p>
                    <img src={warnigIcon} alt="Aviso Importante" />
                    Importante! <br />
                    Preencha todos os dados.
                </p>
                <button type="submit">
                    Salvar cadastro
                </button>
            </footer>
            </form>
        </main>
        </div>
    )
}

export default TeacherForm