import React, {Component} from 'react';
import Swiper from 'react-native-deck-swiper';
import {Button, StyleSheet, Text, View} from 'react-native';
import dbService from '../modules/sqlite';

type SwipeDirection = 'left' | 'right' | 'top' | 'bottom' | 'general';

interface Card {
    id: number;
    amount: number;
}

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
        console.log('Items got:', items);
        this.setState({
            cards: items.map(item => ({id: item.id, amount: item.amount})),
        });
    }

    renderCard = (card?: Card) => {
        if (!card || card.id == 0) {
            return (
                <View style={styles.card}>
                    <Text style={styles.text}>No cards available</Text>
                </View>
            );
        }
        console.log('Render card:', card);
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Amount: {card.amount}</Text>
            </View>
        );
    };

    onSwiped = (type: SwipeDirection) => {
        this.setState({cardIndex: this.state.cardIndex + 1});
        const cardId =
            this.state.cards.length > 0
                ? this.state.cards[this.state.cardIndex].id
                : 0;
        console.log('Render card index:', this.state.cardIndex);
        console.log(`on swiped ${type}`);
        if (type == 'left' && cardId != 0) {
            this.db.updateItems(cardId, 'GROUP');
        } else if (type == 'right' && cardId != 0) {
            this.db.updateItems(cardId, 'PRIVATE');
        }
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
                    // onSwiped={() =>
                    //     this.onSwiped('general')
                    // }
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    // onSwipedTop={() =>
                    //     this.onSwiped('top')
                    // }
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft}
                    // cards={this.state.cards}
                    cards={
                        this.state.cards.length > 0
                            ? this.state.cards
                            : [{id: 0, amount: 0}]
                    }
                    // renderCard={this.renderCard}
                    // cardIndex={0}
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
