import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from '../../components/Note';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

const STORAGE_KEY = '@rocketnotes:notes';

export function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  // Carrega notas do localStorage ou cria uma nota inicial
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setNotes(JSON.parse(stored));
    } else {
      const initialNotes = [
        {
          id: 1,
          title: 'React',
          description: 'Anotações sobre React',
          tags: [
            { id: '1', name: 'react' },
            { id: '2', name: 'rocketseat' },
          ],
        },
      ];

      setNotes(initialNotes);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));
    }
  }, []);

  // Filtra as notas pelo título digitado na busca
  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  function handleOpenNote(id) {
    navigate(`/details/${id}`);
  }

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText title="Todos" isActive />
        </li>
        <li>
          <ButtonText title="Frontend" />
        </li>
        <li>
          <ButtonText title="React" />
        </li>
        <li>
          <ButtonText title="Nodejs" />
        </li>
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {filteredNotes.map((note) => (
            <Note
              key={note.id}
              data={note}
              onClick={() => handleOpenNote(note.id)}
            />
          ))}

          {filteredNotes.length === 0 && (
            <p>Nenhuma nota encontrada com esse título.</p>
          )}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}