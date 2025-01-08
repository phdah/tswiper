import React, {Component} from 'react';
import Swiper from 'react-native-deck-swiper';
import {Button, StyleSheet, Text, View} from 'react-native';
import dbService from '../modules/sqlite';

// demo purposes only
type Card = number;

type SwipeDirection = 'left' | 'right' | 'top' | 'bottom' | 'general';

interface TransactionsScreenState {
    cards: Card[];
    swipedAllCards: boolean;
    swipeDirection: string;
    cardIndex: number;
}

class TransactionsScreen extends Component<{}, TransactionsScreenState> {
    private swiper: Swiper<Card> | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            cards: [],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0,
        };
    }

    // Get amounts and set to cards
    db = dbService;
    items = this.db.getItems();

    async componentDidMount() {
        const items = await this.db.getItems();
        this.setState({cards: items.map(item => item.ammount)});
    }

    renderCard = (card: Card) => {
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Ammount: {card}</Text>
            </View>
        );
    };

    onSwiped = (type: SwipeDirection) => {
        console.log(`on swiped ${type}`);
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true,
        });
    };

    swipeLeft = () => {
        this.swiper?.swipeLeft();
    };

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={(swiper: Swiper<Card>) => {
                        this.swiper = swiper;
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={3}
                    stackSeparation={15}
                    overlayLabels={{
                        bottom: {
                            title: 'SKIP',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            },
                        },
                        left: {
                            title: 'GROUP',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30,
                                },
                            },
                        },
                        right: {
                            title: 'PRIVATE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30,
                                },
                            },
                        },
                        top: {
                            title: 'NOOOO',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            },
                        },
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                />
                <Button
                    onPress={() => this.swiper?.swipeBack()}
                    title="Swipe Back"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent',
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
    },
});

export default TransactionsScreen;
