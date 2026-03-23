import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Random "mo:core/Random";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Shayari Application Code
  public type Category = {
    #love;
    #sad;
    #attitude;
    #friendship;
    #motivational;
  };

  public type Shayari = {
    id : Nat;
    text : Text;
    author : Text;
    category : Category;
    likes : Nat;
    createdAt : Time.Time;
  };

  module Shayari {
    public func compare(shayari1 : Shayari, shayari2 : Shayari) : Order.Order {
      Nat.compare(shayari1.id, shayari2.id);
    };

    public func compareByLikes(shayari1 : Shayari, shayari2 : Shayari) : Order.Order {
      Nat.compare(shayari2.likes, shayari1.likes); // descending order
    };

    public func compareByCreatedAt(shayari1 : Shayari, shayari2 : Shayari) : Order.Order {
      Int.compare(shayari2.createdAt, shayari1.createdAt); // descending order
    };
  };

  var nextId = 1;
  let shayariMap = Map.empty<Nat, Shayari>();
  let userLikes = Map.empty<Principal, Set.Set<Nat>>();

  // Seed with 30 initial shayari
  let initialShayari : [Shayari] = [
    {
      id = 1;
      text = "मोहब्बत कभी खत्म नहीं होती, सिर्फ लोगों का साथ छूट जाता है।";
      author = "Anonymous";
      category = #love;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 2;
      text = "तेरे बिना अधूरी सी लगती है ये ज़िन्दगी।";
      author = "Anonymous";
      category = #love;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 3;
      text = "प्यार वो नहीं जो दुनिया को दिखाया जाए, प्यार वो है जो दिल से निभाया जाए।";
      author = "Anonymous";
      category = #love;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 4;
      text = "तेरी मुस्कान ही मेरी जान है।";
      author = "Anonymous";
      category = #love;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 5;
      text = "इश्क़ हर किसी के नसीब में नहीं होता।";
      author = "Anonymous";
      category = #love;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 6;
      text = "आँसू वही है, जो आँखों से निकले और दिल को हल्का कर दे।";
      author = "Anonymous";
      category = #sad;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 7;
      text = "हर ज़ख्म भर जाता है, बस एक दर्द है जो थमता नहीं।";
      author = "Anonymous";
      category = #sad;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 8;
      text = "दर्द वही है, जो आँखों से बह सके।";
      author = "Anonymous";
      category = #sad;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 9;
      text = "रिश्ते कभी ख़त्म नहीं होते, बस निभाने वाले बदल जाते हैं।";
      author = "Anonymous";
      category = #sad;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 10;
      text = "ज़िन्दगी में सबसे ज्यादा दर्द वही देता है, जिस पर सबसे ज्यादा भरोसा होता है।";
      author = "Anonymous";
      category = #sad;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 11;
      text = "मुझे क्या फर्क पड़ता है, कौन मुझे पसंद करता है या नहीं।";
      author = "Anonymous";
      category = #attitude;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 12;
      text = "हम वो नहीं जो किसी के पीछे भागे, हम तो वो हैं जिन्हें लोग पाने के लिए तरसते हैं।";
      author = "Anonymous";
      category = #attitude;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 13;
      text = "मेरे स्टाइल को देखकर सब जलते हैं।";
      author = "Anonymous";
      category = #attitude;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 14;
      text = "ऐटिट्यूड तो बच्चों के पास होता है, हम तो खुदा के बंदे हैं।";
      author = "Anonymous";
      category = #attitude;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 15;
      text = "मेरा स्टाइल ही मेरी पहचान है।";
      author = "Anonymous";
      category = #attitude;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 16;
      text = "दोस्ती का रिश्ता सबसे प्यारा होता है।";
      author = "Anonymous";
      category = #friendship;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 17;
      text = "दोस्त वो है, जो हर मुश्किल में साथ दे।";
      author = "Anonymous";
      category = #friendship;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 18;
      text = "सच्चा दोस्त वही है, जो बिना मतलब के साथ दे।";
      author = "Anonymous";
      category = #friendship;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 19;
      text = "दोस्ती में कोई शर्त नहीं होती।";
      author = "Anonymous";
      category = #friendship;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 20;
      text = "दोस्ती वो रिश्ता है, जो उम्र भर निभता है।";
      author = "Anonymous";
      category = #friendship;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 21;
      text = "हर मुश्किल का हल होता है, बस मेहनत करनी पड़ती है।";
      author = "Anonymous";
      category = #motivational;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 22;
      text = "हार मत मानो, कोशिश करने वालों की कभी हार नहीं होती।";
      author = "Anonymous";
      category = #motivational;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 23;
      text = "सपने वो नहीं जो नींद में आएं, सपने वो हैं जो मेहनत से पूरे हों।";
      author = "Anonymous";
      category = #motivational;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 24;
      text = "कठिनाइयाँ ही सफलता की असली पहचान हैं।";
      author = "Anonymous";
      category = #motivational;
      likes = 0;
      createdAt = Time.now();
    },
    {
      id = 25;
      text = "संघर्ष के बिना सफलता असंभव है।";
      author = "Anonymous";
      category = #motivational;
      likes = 0;
      createdAt = Time.now();
    },
  ];

  // Initialize shayari map with initial data
  for (shayari in initialShayari.values()) {
    shayariMap.add(shayari.id, shayari);
  };
  nextId := 26;

  public shared ({ caller }) func addShayari(text : Text, author : Text, category : Category) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add shayari");
    };
    let newShayari : Shayari = {
      id = nextId;
      text;
      author;
      category;
      likes = 0;
      createdAt = Time.now();
    };
    shayariMap.add(nextId, newShayari);
    let id = nextId;
    nextId += 1;
    id;
  };

  public query ({ caller }) func getShayariByCategory(category : Category, page : Nat, pageSize : Nat) : async [Shayari] {
    let filtered = List.empty<Shayari>();
    for (shayari in shayariMap.values()) {
      if (shayari.category == category) {
        filtered.add(shayari);
      };
    };

    // Sorting by createdAt (newest first)
    let sortedArray = filtered.toArray().sort(Shayari.compareByCreatedAt);
    let start = page * pageSize;
    let end = Nat.min((page + 1) * pageSize, sortedArray.size());
    if (start >= sortedArray.size()) {
      return [];
    };
    sortedArray.sliceToArray(start, end);
  };

  public query ({ caller }) func getTrending(page : Nat, pageSize : Nat) : async [Shayari] {
    // Sorting by likes (most liked first)
    let sortedArray = shayariMap.values().toArray().sort(Shayari.compareByLikes);
    let start = page * pageSize;
    let end = Nat.min((page + 1) * pageSize, sortedArray.size());
    if (start >= sortedArray.size()) {
      return [];
    };
    sortedArray.sliceToArray(start, end);
  };

  public query ({ caller }) func searchShayari(keyword : Text) : async [Shayari] {
    let filtered = List.empty<Shayari>();
    for (shayari in shayariMap.values()) {
      if (shayari.text.contains(#text keyword)) {
        filtered.add(shayari);
      };
    };
    filtered.toArray();
  };

  public shared ({ caller }) func likeShayari(shayariId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can like shayari");
    };
    switch (shayariMap.get(shayariId)) {
      case (null) { Runtime.trap("Shayari not found") };
      case (?shayari) {
        // Update user likes
        let currentLikes = switch (userLikes.get(caller)) {
          case (null) { Set.empty<Nat>() };
          case (?likes) { likes };
        };
        if (currentLikes.contains(shayariId)) {
          Runtime.trap("You have already liked this shayari.");
        };

        let updatedShayari = { shayari with likes = shayari.likes + 1 };
        shayariMap.add(shayariId, updatedShayari);
        currentLikes.add(shayariId);
        userLikes.add(caller, currentLikes);
      };
    };
  };

  public shared ({ caller }) func unlikeShayari(shayariId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlike shayari");
    };
    switch (shayariMap.get(shayariId)) {
      case (null) { Runtime.trap("Shayari not found") };
      case (?shayari) {
        // Update user likes
        let currentLikes = switch (userLikes.get(caller)) {
          case (null) { Set.empty<Nat>() };
          case (?likes) { likes };
        };
        currentLikes.remove(shayariId);
        userLikes.add(caller, currentLikes);
        let updatedShayari = { shayari with likes = shayari.likes - 1 };
        shayariMap.add(shayariId, updatedShayari);
      };
    };
  };

  public query ({ caller }) func getLikedShayariIds(user : Principal) : async [Nat] {
    switch (userLikes.get(user)) {
      case (null) { [] };
      case (?likes) { likes.toArray() };
    };
  };

  public shared ({ caller }) func getRandomShayari(category : Category) : async ?Shayari {
    let filtered = List.empty<Shayari>();
    for (shayari in shayariMap.values()) {
      if (shayari.category == category) {
        filtered.add(shayari);
      };
    };
    let filteredArray = filtered.toArray();
    if (filteredArray.size() == 0) {
      return null;
    };
    let randomIndex = await Random.natRange((0, filteredArray.size()));
    ?filteredArray[randomIndex];
  };
};
