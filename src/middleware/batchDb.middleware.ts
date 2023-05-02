
  const reloadDb = (e) => {
    e.preventDefault();
    console.log("Cargando db");
    axios.get("https://connect.deezer.com/oauth/auth.php?app_id=599664&redirect_uri=http://localhost:5173/home&perms=basic_access")
      .then(res => console.log(res))
      .catch(err => console.error(err));

/*     axios.get(`https://api.deezer.com/artist/${ourArtists[0]}`)
      .then(res => {
        console.log(res);
      }).catch(err => console.error(err)); */
  }