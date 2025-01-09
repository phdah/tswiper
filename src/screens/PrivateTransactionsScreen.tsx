import React, {Component} from 'react';
// https://github.com/webraptor/react-native-deck-swiper
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

class PrivateTransactionsScreen extends Component<{}, TransactionsScreenState> {
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
    items = this.db.getPrivateItems();

    async componentDidMount() {
        const items = await this.db.getPrivateItems();
        console.log('Items got:', items);
        this.setState({
            cards: items.map(item => ({id: item.id, amount: item.amount})),
        });
    }

    getCards = () => {
        return this.state.cards.length > 0 ? this.state.cards : [];
    };

    renderCard = (card?: Card) => {
        if (!card) {
            return <Text style={styles.text}>No more amounts</Text>;
        }
        console.log('Render card:', card);
        console.log('All cards:', this.state.cards)
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Amount: {card.amount}</Text>
            </View>
        );
    };

    onSwiped = (type: SwipeDirection) => {
        console.log(`on swiped ${type}`);
    };

    onSwipedAction = (type: SwipeDirection) => {
        this.setState({cardIndex: this.state.cardIndex + 1});
        const cardId =
            this.state.cards.length > 0
                ? this.state.cards[this.state.cardIndex].id
                : 0;
        console.log('Render card index:', this.state.cardIndex);
        this.onSwiped(type);
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

    // TODO: Fix the swipe back button
    swipeBackButton = () => {
        // this.swiper?.swipeBack();
        // this.setState({cardIndex: this.state.cardIndex - 1});
    };

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={(swiper: Swiper<Card>) => {
                        this.swiper = swiper;
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwipedAction('left')}
                    onSwipedRight={() => this.onSwipedAction('right')}
                    onSwipedBottom={() => this.onSwipedAction('bottom')}
                    cards={this.getCards()}
                    renderCard={this.renderCard}
                    cardVerticalMargin={80}
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
                {this.state.cards.length > 0 && (
                    <Button onPress={this.swipeBackButton} title="Swipe Back" />
                )}
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

export default PrivateTransactionsScreen;
