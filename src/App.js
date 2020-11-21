const  App = () => {
  return (
    <Router>
        <NavBar setContainerClass={setContainerClass} />
      <div className={containerClass}>
        <div className="main">
          <Switch>
            <Route exact path={HOME} component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
