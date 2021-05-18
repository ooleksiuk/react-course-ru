import React from 'react';
import PropTypes from 'prop-types';
import { Article } from './Article';

class News extends React.Component {
  // Добавлено св-во  state в компонент <News />
  state = {
    counter: 0,
  };

  // Рендерим разметку с новостными записями
  // N.B! Используем синтаксис стрелочной ф-ии чтобы не терять контекст this (можем обращаться к this.props)
  renderNews = () => {
    const { posledine_novosti } = this.props;
    // Переменная-шаблон объявленная заранее, в которую в зависимости от условия НАПОЛНЯЕТСЯ необходимая разметка.
    let newsTemplate = null;

    if (posledine_novosti.length) {
      newsTemplate = posledine_novosti.map(function (item) {
        return <Article key={item.id} note={item} />;
      });
    } else {
      newsTemplate = <p> К сожалению новостей нет </p>;
    }

    return newsTemplate;
  };

  render() {
    const { posledine_novosti } = this.props;
    // console.log(this.renderNews());

    return (
      <div className="news">
        {this.renderNews()}
        {
          /* добавили onClick */
          posledine_novosti.length ? (
            <strong className={'news__count'}>
              Всего новостей: {posledine_novosti.length}
            </strong>
          ) : null
        }
      </div>
    );
  }
}

// добавили propTypes - свойство.
// propTypes (с маленькой буквы) = свойство News
News.propTypes = {
  posledine_novosti: PropTypes.array.isRequired, // PropTypes (с большой буквы) = библиотека prop-types
};

export { News };
