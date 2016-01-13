var app = angular.module( 'App', ['react'] );

app.controller( 'mainCtrl', function( $scope ) {
    $scope.compare = {
      assurance: "There is no doubt,",
      contender: "Sheep"
    };
} );

app.value( "Greatest", React.createClass( {
  propTypes: {
    assurance: React.PropTypes.string.isRequired
  },

  render: function() {
    return React.DOM.span( null,
      this.props.assurance + ' Cows are the best animal ever.'
    );
  }
} ) );

app.value( "NearBest", React.createClass( {
  propTypes: {
    contender: React.PropTypes.string.isRequired
  },

  render: function() {
    return React.DOM.span( null,
      this.props.contender + ' are almost as cool... but could never pass cows... ever.'
    );
  }
} ) );

app.directive( 'greatest', function( reactDirective ) {
  return reactDirective( 'Greatest' );
} );

app.directive( 'near', function( reactDirective ) {
  return reactDirective( 'NearBest' );
} );
