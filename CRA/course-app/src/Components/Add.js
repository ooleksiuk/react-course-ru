import React from 'react';
import PropTypes from 'prop-types';

class Add extends React.Component {
  state = {
    // 1. добавили начальное состояние
    name: '',
    text: '',
    bigText: '',
    agree: false,
  };

  onBtnClickHandler = (e) => {
    e.preventDefault();
    const { name, text, bigText } = this.state;

    // Вызов функции handleAddNews сохраненной в props - onAddNews
    this.props.onAddNews({
      id: +new Date(),
      author: name, // name сохраняем в поле author
      text,
      bigText,
    });
  };

  /* Было:

    handleNameChange = (e) => {
      this.setState({ name: e.currentTarget.value });
    };
    handleTextChange = (e) => {
      this.setState({ text: e.currentTarget.value });
    };

    */

  // 2. добавили ЕДИНЫЙ обработчик на изменение имени и текста новости
  handleChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  // обработчик кликов по чекбоксу
  handleCheckboxChange = (e) => {
    // чтобы установить true/false считываем свойство checked
    this.setState({ agree: e.currentTarget.checked });
    //  N.B: происходит изменение state => вызывается перерисовка !!!
  };

  // Функция валидации (c использованием состояния):
  // если в поле "имя" или "текст" не введено ничего (либо пробелы - trim() )
  // - кнопка "показать alert" должна быть недоступной.
  validate = () => {
    const { name, text, agree } = this.state;
    if (name.trim() && text.trim() && agree) {
      return true;
    }
    return false;
  };

  render() {
    const { name, text, bigText } = this.state; // 3. вытащили значения из стейта
    console.log('Рендерим TestInput компонент');
    // в value элементов записали значения переменных из состояния
    return (
      <form className="add">
        <input
          id="name"
          type="text"
          onChange={this.handleChange}
          className="add__author"
          placeholder="Ваше имя"
          value={name}
        />
        <textarea
          id="text"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Текст новости"
          value={text}
        ></textarea>

        {/* добавили bigText */}
        <textarea
          id="bigText"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Текст новости подробно"
          value={bigText}
        ></textarea>

        <label className="add__checkrule">
          <input type="checkbox" onChange={this.handleCheckboxChange} /> Я
          согласен с правилами
        </label>
        <button
          className="add__btn"
          onClick={this.onBtnClickHandler}
          // атрибут disabled у кнопки равен значению из state;
          disabled={!this.validate()}
        >
          Добавить новость
        </button>
      </form>
    );
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired, // func используется для проверки передачи function
};

export { Add };
