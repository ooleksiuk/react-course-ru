import React from 'react'; // подключение библиотеки React
import { Add } from './Components/Add';
import { News } from './Components/News';
// import newsData from './data/newsData'; // импорт по дефолту
import './App.css';

/*
  ! Храним и взаимодействуем со state (содержащий новости) в родительском компоненте

  - В дочерний компонент передаём handleAddNews функцию (объявленную в родителе) как props

  */
class App extends React.Component {
  state = {
    news: null,
    isLoading: false, // статус для манипуляций "прелоадером" ("Загружаю..." в нашем случае)
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

  componentDidMount() {
    // запрос за даннмыи начался
    this.setState({ isLoding: true });
    console.log('Запрос за данными начался');
    fetch('http://localhost:3000/data/newsData.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          this.setState({ isLoading: false, news: data });
        }, 3000);

        /*
           делаем задержку в 3 секунды
           запрос завершился успешно,
           делаем isLoading: false
           в news кладем пришедшие данные
        */

        console.log('приехали данные ', data);
      });
  }

  render() {
    const { news, isLoading } = this.state; // все необходимое взяли из state

    return (
      <React.Fragment>
        {/* В props компонента передаем функцию, имеющую доступ к state*/}
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News posledine_novosti={news} />}
      </React.Fragment>
    );
  }
}

export default App;
