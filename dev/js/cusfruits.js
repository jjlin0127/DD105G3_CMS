        // var data = [
        //     { type: '幫助消化', score: '3' },
        //     { type: '活化大腦', score: '2' },
        //     { type: '保護血管', score: '1' },
        // ];

        // var svg = d3.select('#svg')
        // var padding = { top: 20, right: 30, bottom: 30, left: 50 };

        // var chartarea = {
        //     "width": parseInt(svg.style("width")) - padding.left - padding.right,
        //     "height": parseInt(svg.style("height")) - padding.top - padding.bottom,
        // }
        // var yScale = d3.scalelinear()
        //     .domain([0, d3.max(data, function(d, i) { return d.score })])
        //     .range([chartarea.height, 0]).nice();
        // var xScale = d3.scaleband()
        //     .domain(data.map(function(d) { return d.type }))
        //     .range([0, chartarea.width])
        //     .padding(.2);

        // var xAxis = svg.append("g")
        //     .classed("xAxis", true)
        //     .attr(
        //         'transform', 'translate(' + padding.left + ','
        //     )

        //養生指數
        Chart.defaults.global.legend.display = false;
        var ctx = document.getElementById('heyChart');

        data = {
            labels: ['幫助消化', '活化大腦', '保護血管'],
            datasets: [{
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                data: [3, 2, 1]
            }]
        }

        options = {
            scale: {
                angleLines: {
                    display: true //連到三角形三點的直線
                },
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 7,
                    suggestedMin: 0,
                    suggestedMax: 1,
                },
                gridLines: {
                    display: true,
                    circular: true,
                },
                pointLabels: {
                    fontSize: 18,
                    fontColor: ['#20B2AA', '#F4A460', '#FF6347'],
                    fontFamily: 'Noto Sans TC',
                }
            }
        };

        var heyChart = new Chart(
            ctx, {
                type: 'radar',
                data: data,
                options: options
            });

        //------------------------------------------------------------

        window.addEventListener('load', function() {
            images = document.getElementsByClassName('draggable');
            for (let i = 0; i < images.length; i++) {
                images[i].addEventListener('dragstart', function(e) {
                    // let data = '<img src="./images/cusFruits/01_starFruit_c.png">';
                    let data = `${images[i]}`;
                    // let data = images[i].src;
                    // let data = i;
                    // console.log(images[i])
                    console.log(data)

                    e.dataTransfer.setData('image/*', data);
                });
            }

            droppedzones = document.getElementsByClassName('droppedzone');
            for (let j = 0; j < droppedzones.length; j++) {
                droppedzones[j].addEventListener('dragenter', function(e) {
                    e.preventDefault();
                })
                droppedzones[j].addEventListener('dragover', function(e) {
                    e.preventDefault();
                })
                droppedzones[j].addEventListener('drop', function(e) {
                    e.preventDefault();

                    // console.log(e.target.className);
                    // console.log(e.dataTransfer.getData('image/png'));


                    // var inputs = document.getElementsByTagName('input');
                    // test.src = e.dataTransfer.getData('image/png');
                    // this.insertBefore(test, input[j]);
                    this.innerHTML = e.dataTransfer.getData('image/*');

                    var test = document.createElement('img');
                    // e.dataTransfer.getData('text/plain');
                    // test.src = data;
                    // this.appendChild(test);

                    // e.target.appendChild(e.dataTransfer.getData('image/*'));
                })
            }
        })

        // $("#img01").draggable({
        //     containment:"#middle01",
        // });
        // $("#middle01").droppable({
        //     drop: function(event, ui) {
        //         $(this).css('background', 'rgb(0,200,0)');
        //     },
        //     over: function(event, ui) {
        //         $(this).css('background', 'orange');
        //     },
        //     out: function(event, ui) {
        //         $(this).css('background', 'cyan');
        //     }
        // });


        function popupOpenClose(popup) {

            /* Add div inside popup for layout if one doesn't exist */
            if ($(".wrapper").length == 0) {
                $(popup).wrapInner("<div class='wrapper'></div>");
            }

            /* Open popup */
            $(popup).show();

            /* Close popup if user clicks on background */
            $(popup).click(function(e) {
                if (e.target == this) {
                    if ($(popup).is(':visible')) {
                        $(popup).hide();
                    }
                }
            });

            /* Close popup and remove errors if user clicks on cancel or close buttons */
            $(popup).find("button[name=close]").on("click", function() {
                if ($(".formElementError").is(':visible')) {
                    $(".formElementError").remove();
                }
                $(popup).hide();
            });
        }

        $(document).ready(function() {
            popupOpenClose($(".popup"));
        });