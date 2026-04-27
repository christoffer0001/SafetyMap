class IconBtns {
  constructor(mapClass, restartMapLoading) {
    this.sizeText = width / 20;

    this.btnW = width / 4;
    this.vennesymbolX = (1.05 * width) / 4;
    this.natteravnX = (2.1 * width) / 4;
    this.brugerprofilX = (3.15 * width) / 4;

    this.mode = "icons"; // "icons", "barometer", "profile"

    //Telf nr. hentes fra local storage, hvis det eksisterer
    this.venTelf = localStorage.getItem("venTelf") ? parseInt(localStorage.getItem("venTelf")) : "";

    //Phone Input (created, with position, and hidden)
    this.inputPhone = createInput().position(180, 615).hide();

    this.map = mapClass;
    this.restartMapLoading = restartMapLoading; //Function to restart the map with new interval

    //Zoom preference slider (from, to, default, step) (created, with position, and hidden)
    this.zoomPref = createSlider(0, 20, 16, 1).position(180, 650).hide();

    //Bruger arrow funktion efter eventlistener (.input: "Calls a function when the element receives input")
    this.zoomPref.input(() => {
      this.map.setZoom(this.zoomPref.value());
    });

    this.updateInterval = createSlider(0.1, 10, 0.5, 0.1).position(180, 680).hide();

    //Bruger arrow funktion efter eventlistener (.input: "Calls a function when the element receives input")
    this.updateInterval.input(() => {
      updateInterval = this.updateInterval.value();
      localStorage.setItem("updateInterval", updateInterval);
    });

    this.profileSubmit = createButton("Indsend").position(200, 700).hide();

    this.profileSubmit.mousePressed(() => {
      this.infoSubmitted();
    });
  }

  display(barometer, vennesymbol, natteravn, brugerprofil) {
    if (this.mode === "barometer") {
      // BAROMETER VIEW
      for (let i = 0; i < 10; i++) {
        if (i <= 3) fill(100, 255, 100);
        else if (i <= 6) fill(255, 255, 0);
        else fill(255, 0, 0);

        let rectX = width / 10;
        textSize(this.sizeText);

        rect(rectX * i, height / 50, rectX, height * 0.96);

        fill(0);
        text(i + 1, rectX * i + width / 20 - this.sizeText / 3, height / 2 + this.sizeText / 3);
      }
    } else if (this.mode === "profile") {
      // PROFILE VIEW
      background(220);
      fill(0);
      textSize(16);
      text("Indtast telf:", 45, 30);

      text("Zoom Præference:", 45, 65);

      text("Update rate:", 45, 95);

      this.inputPhone.show();
      this.zoomPref.show();
      this.profileSubmit.show();
      this.updateInterval.show();
    } else {
      this.inputPhone.hide();
      this.zoomPref.hide();
      this.profileSubmit.hide();
      this.updateInterval.hide();
      // ICON VIEW
      image(barometer, 0, 0, this.btnW, height);
      image(vennesymbol, this.vennesymbolX, -height / 6.67, this.btnW, height * 1.4);
      image(natteravn, this.natteravnX, -height / 20, width / 5, height);
      image(brugerprofil, this.brugerprofilX, 0, width / 6, height);
    }
  }

  clicked(x, y) {
    if (x < 0 || x > width || y < 0 || y > height) return;
    if (this.mode === "barometer") {
      for (let i = 0; i < 10; i++) {
        let rectX = (width / 10) * i;
        let rectW = width / 10;

        if (x >= rectX && x <= rectX + rectW) {
          let squareNr = i + 1;
          this.mode = "icons";
          getPos(squareNr);
        }
      }
      return;
    }

    // BAROMETER BUTTON
    if (x > 0 && x < this.btnW && this.mode == "icons") {
      this.mode = "barometer";
    } else if (x > this.brugerprofilX && x < this.brugerprofilX + width / 6 && this.mode == "icons") {
      this.mode = "profile";
    } else if (x > this.vennesymbolX && x < this.vennesymbolX + this.btnW && this.mode == "icons") {
      console.log("Call Friend: " + this.venTelf);
    } else if (x > this.natteravnX && x < this.natteravnX + width / 5 && this.mode == "icons") {
      console.log("Call Natteravn");
    }
  }

  //Runs when clicking submit in profile settings
  infoSubmitted() {
    //Check profile input
    if (this.mode === "profile") {
      this.restartMapLoading(); //Genindlæser kortet med (evt.) nyt updateringsinterval
      if (this.inputPhone) {
        this.venTelf = this.inputPhone.value();
        if (this.venTelf != "") {
          localStorage.setItem("venTelf", this.venTelf);
        } else {
          console.log("Blank");
        }
      }
      this.mode = "icons";
    }
  }
}
