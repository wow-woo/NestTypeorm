##ManyToOne()

---

##Schema
id | listener | podcastSubscription | playedEpisode
primary USER(FK) PODCAST(FK) EPISODE(FK)

---

##Relations :
LISTENER_HISTORY < USER
LISTENER_HISTORY < PODCAST
LISTENER_HISTORY < EPISODE
