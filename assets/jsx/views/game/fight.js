var
  React = require('react'),
  CharacterSheet = require('../../components/character-sheet'),
  ClassSelector = require('../../components/class-selector');

React.render(
  <div>
    <CharacterSheet />
    <ClassSelector />
  </div>,
  document.getElementById('app')
);