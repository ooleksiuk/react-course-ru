import React from 'react'; // мы обязаны импортировать необходимые пакеты в каждом файле
import PropTypes from 'prop-types'; // у Article это react и prop-types

// далее просто скопировано все что было, кроме последней строки

class Article extends React.Component {
  // динамич св-во state
  state = {
    visible: false, // определили начальное состояние
  };
  handleReadMoreClck = (e) => {
    // добавили метод
    e.preventDefault();
    this.setState({ visible: true });
  };
  render() {
    const { author, text, bigText } = this.props.note; // вытащили неизменяемые св-ва из this.props
    const { visible } = this.state; // вытащилии динамич. св-во visible из this.state
    // console.log('render вызов', this); // добавили console.log
    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        {
          /* если не visible, то показывай */
          !visible && (
            <a
              onClick={this.handleReadMoreClck}
              href="#readmore"
              className="news__readmore"
            >
              Подробнее
            </a>
          )
        }
        {
          /* если visible, то показывай */
          visible && <p className="news__big-text">{bigText}</p>
        }
      </div>
    );
  }
}

// добавили propTypes - свойство в компонент <Article />
Article.propTypes = {
  id: PropTypes.string.isRequired,
  note: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export { Article }; // именованный экспорт
