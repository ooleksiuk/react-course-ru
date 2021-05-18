import React from 'react'; // подключение библиотеки React
import { Add } from './Components/Add';
import { News } from './Components/News';
import newsData from './data/newsData'; // импорт по дефолту
import './App.css';

/*
  ! Храним и взаимодействуем со state (содержащий новости) в родительском компоненте

  - В дочерний компонент передаём handleAddNews функцию (объявленную в родителе) как props

  */
class App extends React.Component {
  state = {
    news: newsData,
  };
  //  ******************************************************************************
  handleAddNews = (data) => {
    console.log(
      'я вызвана из Add, но имею доступ к this.state у App!',
      this.state.news
    );

    // сначала мы формируем массив, на основе
    // всего того, что уже было в новостях
    // и кладем это все в новый массив +
    // новую новость кладем в начало массива
    const nextNews = [data, ...this.state.news];
    // затем обновляем новый массив новостей в this.state.news
    this.setState({ news: nextNews });
  };

  //  ******************************************************************************

  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {/* В props компонента передаем функцию, имеющую доступ к state*/}
        <News posledine_novosti={this.state.news} />
      </React.Fragment>
    );
  }
}

export default App;
