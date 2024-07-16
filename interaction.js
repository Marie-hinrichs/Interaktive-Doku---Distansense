document.addEventListener("DOMContentLoaded", function () {
  const movable = document.getElementById("movable");
  const fixed = document.getElementById("fixed");
  const circleMovable = document.getElementById("circleMovable");
  const circleFixed = document.getElementById("circleFixed");
  const distanceInfo = document.getElementById("distanceInfo");
  let isDragging = false;

  movable.addEventListener("mousedown", function (e) {
    isDragging = true;
    movable.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
    movable.style.cursor = "grab";
    updateCircles();
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      let newX = e.pageX - 15;
      let newY = e.pageY - 40;

      newX = Math.max(0, Math.min(newX, window.innerWidth / 2 - 30));

      movable.style.left = newX + "px";
      movable.style.top = newY + "px";
      updateCircles();
    }
  });

  function updateCircles() {
    const dist = Math.hypot(
      fixed.offsetLeft + 15 - (movable.offsetLeft + 15),
      fixed.offsetTop + 40 - (movable.offsetTop + 40)
    );

    const maxRadius = dist / 2;
    const circleSize = Math.min(maxRadius * 0.9, 180);

    [circleMovable, circleFixed].forEach((circle, index) => {
      const center = index === 0 ? movable : fixed;
      circle.style.display = circleSize > 0 ? "block" : "none";
      circle.style.width = `${circleSize * 2}px`;
      circle.style.height = `${circleSize * 2}px`;
      circle.style.left = `${center.offsetLeft + 15 - circleSize}px`;
      circle.style.top = `${center.offsetTop + 40 - circleSize}px`;
    });

    const circles = [circleMovable, circleFixed];
    circles.forEach((circle) => {
      const borderWidth = 20 - (dist / 360) * 15;
      circle.style.borderColor = getBorderColor(dist);
      circle.style.borderWidth = `${Math.max(5, borderWidth)}px`;
      circle.classList.toggle("pulse", dist < 120);
    });

    updateInfo(dist);
  }

  function getBorderColor(dist) {
    if (dist < 120) {
      return "red";
    } else if (dist < 210) {
      return "purple";
    } else if (dist < 360) {
      return "blue";
    } else {
      return "transparent";
    }
  }

  function updateInfo(dist) {
    if (dist >= 360) {
      distanceInfo.innerHTML = `
        <h2>Öffentliche Distanzzone</h2>
        <h3> Distanz größer als 3,6 m <h4>
        <p>In der öffentlichen Zone sind die Interaktionen normalerweise formal und nicht persönlich, bspw. der Blickkontakt mit Fremden in einer Fußgänger-zone. Betritt ein Fremder diese Zone, wird das meist nicht als Eindringen in den persönlichen Raum empfunden, da der Abstand noch ausreichend groß ist. Die emotionalen Reaktionen in dieser Zone sind in der Regel neutral und weniger intensiv.</p>
      `;
    } else if (dist >= 210) {
      distanceInfo.innerHTML = `
        <h2>Soziale Zone</h2>
         <h3> Distanz zwischen 1,2 m und 3,6 m <h4>
        <p>In der sozialen Zone finden häufig formellere Interaktionen statt, wie beispielsweise Gespräche mit einem Vorgesetzten. In dieser Zone ist die Wahrnehmung auf die verbale Kommunikation und nonverbale Signale wie Gestik und Mimik gerichtet. Die emotionalen Reaktionen auf das Eintreten eines Fremden können hier variieren. Auf diese Distanz nehmen wir eine Fremde Person führ gewöhnlich wahr. In der anonymen und schnelllebigen Umge-bung des Bahnhofes könnte das unvermittelte Nahen zu einer erhöhten Aufmerksamkeit und Misstrauen führen.</p>
      `;
    } else if (dist >= 120) {
      distanceInfo.innerHTML = `
        <h2>Persönliche Zone</h2>
        <h3> Distanz zwischen 0,6 m und 1,2 m <h4>
        <p>In der persönlichen Zone finden oft vertrautere Interaktionen statt, wie Gespräche mit Freunden. Da diese Zone normalerweise für vertrauliche Interaktionen reserviert ist, kann das Eindringen eines Unbekannten Gefühle von Unbehagen oder Irritation auslösen. In einer so persönlichen Nähe kann das unerwartete Näherkommen eines Fremden als Verletzung des persönlichen Raums empfunden werden, was zu Angst oder Unwohlsein führen kann.</p>
      `;
    } else {
      distanceInfo.innerHTML = `
        <h2>Intime Zone</h2>
        <h3> Distanz kleiner als 0,6 m <h4>
        <p>In der intimen Zone sind Interaktionen wie Umarmungen oder Küsse üblich, die typischerweise zwischen eng verbundenen Personen wie Partnern stattfinden. Wenn ein fremde Person am Bahnhof unerwartet diese Distanz betritt, kann dies als hochgradig unangemessen und beunruhigend empfunden werden. Das Eindringen eines Unbekannten in diese intime Zone löst oft Gefühle von Angst, Bedrohung oder starker Verletzung der Privatsphäre aus, da es die persönlichsten Grenzen des Einzelnen stark überschreitet.</p>
      `;
    }
  }
});
