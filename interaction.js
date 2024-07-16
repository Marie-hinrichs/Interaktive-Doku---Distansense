document.addEventListener("DOMContentLoaded", function () {
  const movable = document.getElementById("movable");
  const fixed = document.getElementById("fixed");
  const circleMovable = document.getElementById("circleMovable");
  const circleFixed = document.getElementById("circleFixed");
  const distanceInfo = document.getElementById("distanceInfo");
  const logo = document.getElementById("logo");
  const logoContainer = document.getElementById("logoContainer");
  const logoText = document.getElementById("logoText");
  let isDragging = false;

  // Funktion zur Steuerung des Ausklappens und Einklappens des Logos und Textes
  logo.addEventListener("click", function () {
    if (logoText.classList.contains("visible")) {
      logoText.classList.remove("visible");
      logoContainer.style.bottom = "10px";
    } else {
      logoText.classList.add("visible");
      logoContainer.style.bottom = "20px";
    }
  });

  // Ziehen des beweglichen Rechtecks zu ermöglichen
  movable.addEventListener("mousedown", function (e) {
    isDragging = true;
    movable.style.cursor = "grabbing";
  });

  // Ziehen beenden
  document.addEventListener("mouseup", function () {
    isDragging = false;
    movable.style.cursor = "grab";
    updateCircles();
  });

  // Bewegung des Rechtecks beim ziehen
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      // Position Rechteck
      let newX = e.pageX - 15;
      let newY = e.pageY - 40;

      // Begrenzung der Bewegung auf die linke Bildschirmhälfte
      newX = Math.max(0, Math.min(newX, window.innerWidth / 2 - 30));

      // Setzt die neue Position des beweglichen Rechtecks
      movable.style.left = newX + "px";
      movable.style.top = newY + "px";
      updateCircles();
    }
  });

  // Aktualisierung der Kreise basierend auf den Positionen der Rechtecke
  function updateCircles() {
    // Berechnet die Distanz zwischen den Mittelpunkten der beiden Rechtecke
    const dist = Math.hypot(
      fixed.offsetLeft + 15 - (movable.offsetLeft + 15),
      fixed.offsetTop + 40 - (movable.offsetTop + 40)
    );

    // maximale Größe der Kreise basierend auf der Distanz
    const maxRadius = dist / 2;
    const circleSize = Math.min(maxRadius, 180);

    // Setzt Größe und Position der Kreise basierend auf der Distanz
    [circleMovable, circleFixed].forEach((circle, index) => {
      const center = index === 0 ? movable : fixed;
      circle.style.display = circleSize > 0 ? "block" : "none";
      circle.style.width = `${circleSize * 2}px`;
      circle.style.height = `${circleSize * 2}px`;
      circle.style.left = `${center.offsetLeft + 15 - circleSize}px`;
      circle.style.top = `${center.offsetTop + 40 - circleSize}px`;
    });

    // Setzt die Randfarbe und -breite der Kreise basierend auf der Distanz
    const circles = [circleMovable, circleFixed];
    circles.forEach((circle) => {
      const borderWidth = 20 - (dist / 360) * 15;
      circle.style.borderColor = getBorderColor(dist);
      circle.style.borderWidth = `${Math.max(5, borderWidth)}px`;
      circle.classList.toggle("pulse", dist < 120);
    });
    // Aktualisiert den Informationstext basierend auf Distanz
    updateInfo(dist);
  }

  // Bestimmung der Randfarbe basierend auf Distanz
  function getBorderColor(dist) {
    if (dist < 120) {
      return "red";
    } else if (dist < 210) {
      return "darkviolet";
    } else if (dist < 360) {
      return "dodgerblue";
    } else {
      return "transparent";
    }
  }

  // Funktion zur Aktualisierung des Informationstextes basierend auf Distanz
  function updateInfo(dist) {
    if (dist >= 360) {
      distanceInfo.innerHTML = `
        <h2 style="color: dodgerblue;">Öffentliche Distanzzone</h2>
        <h4> Distanz größer als 3,6 m </h4>
        <p>In der öffentlichen Zone sind die Interaktionen 
        normalerweise formal und nicht persönlich, bspw. der 
        Blickkontakt mit Fremden in einer Fußgängerzone. Betritt 
        ein Fremder diese Zone, wird das meist nicht als Eindringen 
        in den persönlichen Raum empfunden, da der Abstand noch
        ausreichend groß ist. Die emotionalen Reaktionen in dieser
        Zone sind in der Regel neutral und weniger intensiv.</p>
      `;
    } else if (dist >= 210) {
      distanceInfo.innerHTML = `
        <h2 style="color: dodgerblue;">Soziale Zone</h2>
         <h4> Distanz zwischen 1,2 m und 3,6 m </h4>
        <p>In der sozialen Zone finden häufig formellere Interaktionen 
        statt, wie beispielsweise Gespräche mit einem Vorgesetzten. In 
        dieser Zone ist die Wahrnehmung auf die verbale Kommunikation und 
        nonverbale Signale wie Gestik und Mimik gerichtet. Die emotionalen 
        Reaktionen auf das Eintreten eines Fremden können hier variieren. Auf 
        diese Distanz nehmen wir eine Fremde Person führ gewöhnlich wahr. In der
        anonymen und schnelllebigen Umgebung des Bahnhofes könnte das unvermittelte 
        Nahen zu einer erhöhten Aufmerksamkeit und Misstrauen führen.</p>
      `;
    } else if (dist >= 120) {
      distanceInfo.innerHTML = `
        <h2 style="color: darkviolet;" >Persönliche Zone</h2>
        <h4> Distanz zwischen 0,6 m und 1,2 m </h4>
        <p>In der persönlichen Zone finden oft vertrautere Interaktionen statt, 
        wie Gespräche mit Freunden. Da diese Zone normalerweise für vertrauliche 
        Interaktionen reserviert ist, kann das Eindringen eines Unbekannten Gefühle
        von Unbehagen oder Irritation auslösen. In einer so persönlichen Nähe kann
        das unerwartete Näherkommen eines Fremden als Verletzung des persönlichen 
        Raums empfunden werden, was zu Angst oder Unwohlsein führen kann.</p>
      `;
    } else {
      distanceInfo.innerHTML = `
        <h2 style="color: red;" >Intime Zone</h2>
        <h4> Distanz kleiner als 0,6 m </h4>
        <p>In der intimen Zone sind Interaktionen wie Umarmungen oder Küsse üblich, 
        die typischerweise zwischen eng verbundenen Personen wie Partnern stattfinden. 
        Wenn ein fremde Person am Bahnhof unerwartet diese Distanz betritt, kann dies
        als hochgradig unangemessen und beunruhigend empfunden werden. Das Eindringen
        eines Unbekannten in diese intime Zone löst oft Gefühle von Angst, Bedrohung 
        oder starker Verletzung der Privatsphäre aus, da es die persönlichsten Grenzen 
        des Einzelnen stark überschreitet.</p>
      `;
    }
  }

  // Event listeners for both movable and fixed elements
  movable.addEventListener("mousedown", (e) => onMouseDown(e, movable));
  fixed.addEventListener("mousedown", (e) => onMouseDown(e, fixed));

  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
});
