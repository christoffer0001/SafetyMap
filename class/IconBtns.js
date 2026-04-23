class IconBtns {
  constructor(mapThing) {
    this.sizeText = width / 20;

    this.btnW = width / 4;
    this.vennesymbolX = (1.05 * width) / 4;
    this.natteravnX = (2.1 * width) / 4;
    this.brugerprofilX = (3.15 * width) / 4;

    this.mode = "icons"; // icons, barometer, profile

    this.venTelf = "";

    //Phone Input (created, with position, and hidden)
    this.inputPhone = createInput().position(180, 615).hide();

    this.map = mapThing;
    //Zoom preference slider (from, to, default, step) (created, with position, and hidden)
    this.zoomPref = createSlider(0, 20, 16, 1).position(180, 650).hide();

    //Bruger arrow funktion efter eventlistener (.input: "Calls a function when the element receives input")
    this.zoomPref.input(() => {
      this.map.setZoom(this.zoomPref.value());
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
      text("Enter phone:", 50, 30);

      text("Zoom preference:", 50, 65);

      this.inputPhone.show();
      this.zoomPref.show();
      this.profileSubmit.show();
    } else {
      this.inputPhone.hide();
      this.zoomPref.hide();
      this.profileSubmit.hide();
      // ICON VIEW
      image(barometer, 0, 0, this.btnW, height);
      image(vennesymbol, this.vennesymbolX, -height / 6.67, this.btnW, height * 1.4);
      image(natteravn, this.natteravnX, -height / 20, width / 5, height);
      image(brugerprofil, this.brugerprofilX, 0, width / 6, height);
    }
  }

  clicked(x, y) {
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
      console.log("Call Friend");
    } else if (x > this.natteravnX && x < this.natteravnX + width / 5 && this.mode == "icons") {
      console.log("Call Natteravn");
    }
  }

  //Runs when clicking submit in profile settings
  infoSubmitted() {
    //Check profile input
    if (this.mode === "profile") {
      if (this.inputPhone) {
        this.venTelf = this.inputPhone.value();
        if (this.venTelf != "") {
          console.log("Telf: " + this.venTelf);
        } else {
          console.log("Blank");
        }
      }
    }
  }
}
