
function createBugTracker() {
const html = `    
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Bug Reporter</title>
                    <style>
                        #bug-report-tab {
                            position: fixed;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            background-color: #FF6737;
                            color: white;
                            padding: 10px;
                            cursor: pointer;
                            z-index: 1000;
                        }

                        #bug-report {
                            position: fixed;
                            right: -320px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 320px;
                            height: 500px;
                            background: white;
                            border: 1px solid #ccc;
                            padding: 10px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            transition: right 0.3s ease-in-out;
                            z-index: 999;
                        }

                        #bug-report.open {
                            right: 0;
                        }

                        #bug-report textarea {
                            width: 100%;
                            height: 100px;
                            margin-bottom: 10px;
                        }

                        #bug-report img {
                            display: block;
                            width: 100%;
                            height: auto;
                            margin-bottom: 10px;
                            border: 2px solid #FF6737;
                        }

                        #send-report, #edit-screenshot {
                            background-color: #FF6737;
                            color: white;
                            border: none;
                            padding: 10px;
                            cursor: pointer;
                            width: 100%;
                            margin-bottom: 10px;
                        }

                        #annotation-modal {
                            display: none;
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(255, 255, 255, 1);
                            justify-content: center;
                            align-items: center;
                            z-index: 10000;
                        }

                        #annotation-modal.open {
                            display: flex;
                        }

                        #annotation-editor {
                            background: white;
                            padding: 20px;
                            position: relative;
                            border: 2px solid #FF6737;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            width: 80%;
                            height: 80%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        #annotation-canvas {
                            border: 2px solid #FF6737;
                            background: white;
                            width: 100%;
                            height: 100%;
                        }

                        #logo {
                            display: block;
                            margin: 0 auto 10px;
                            width: 50px;
                            height: 50px;
                        }

                        .tool-icon {
                            width: 30px;
                            height: 30px;
                            margin: 5px;
                            cursor: pointer;
                        }

                        #tools {
                            display: flex;
                            justify-content: center;
                            position: sticky;
                            top: 0;
                            background: white;
                            z-index: 1001;
                            padding: 10px 0;
                            border-bottom: 2px solid #FF6737;
                            width: 100%;
                        }

                        #save-annotations {
                            background-color: #FF6737;
                            color: white;
                            border: none;
                            padding: 10px;
                            cursor: pointer;
                            margin-left: 10px;
                            margin-right: 10px;
                        }

                        #delete-item {
                            background-color: #FF6737;
                            color: white;
                            border: none;
                            padding: 10px;
                            cursor: pointer;
                            margin-left: 10px;
                            margin-right: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div id="bug-report-tab">Report Bug</div>
                    <div id="bug-report">
                        <img id="logo" src="https://s3.amazonaws.com/appforest_uf/f1623428996372x454024171328204500/MLabsBottleBubblingWhitev2.gif" alt="Logo" width="50" height="50">
                        <textarea id="description" placeholder="Describe the bug"></textarea>
                        <img id="screenshot" alt="Screenshot">
                        <button id="edit-screenshot">Edit Screenshot</button>
                        <button id="send-report">Send Report</button>
                    </div>

                    <div id="annotation-modal">
                        <div id="annotation-editor">
                            <div id="tools">
                                <img id="add-arrow" class="tool-icon" src="https://cdn-icons-png.flaticon.com/512/25/25298.png" alt="Add Arrow">
                                <img id="add-text" class="tool-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Add Text">
                <button id="delete-item">
                                    <img class="tool-icon" src="https://cdn-icons-png.flaticon.com/512/565/565922.png" alt="Delete Item">
                                </button>

                                <button id="save-annotations">Save Annotations</button>
                            
                            </div>
                            <canvas id="annotation-canvas"></canvas>
                        </div>
                    </div>

                    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.5.0/fabric.min.js"></script>
                    <script>
                        let fabricCanvas;

                        document.getElementById('bug-report-tab').addEventListener('click', function() {
                            const bugReport = document.getElementById('bug-report');
                            const bugReportTab = document.getElementById('bug-report-tab');

                            if (bugReport.classList.contains('open')) {
                                bugReport.classList.remove('open');
                                bugReportTab.style.display = 'block';
                            } else {
                                bugReport.classList.add('open');
                                bugReportTab.style.display = 'none';
                                html2canvas(document.body, { useCORS: true, logging: true }).then(canvas => {
                                    const img = document.getElementById('screenshot');
                                    img.src = canvas.toDataURL();
                                }).catch(error => console.error('Error capturing screenshot:', error));
                            }
                        });

                        document.getElementById('edit-screenshot').addEventListener('click', function() {
                            const modal = document.getElementById('annotation-modal');
                            modal.classList.add('open');

                            const img = document.getElementById('screenshot');
                            const canvasElement = document.getElementById('annotation-canvas');
                            fabricCanvas = new fabric.Canvas('annotation-canvas', {
                                backgroundColor: 'white'
                            });

                            fabric.Image.fromURL(img.src, function(oImg) {
                                const editorWidth = document.getElementById('annotation-editor').clientWidth - 40;
                                const editorHeight = document.getElementById('annotation-editor').clientHeight - 80;
                                const scale = Math.min(editorWidth / oImg.width, editorHeight / oImg.height);
                                oImg.scale(scale);
                                fabricCanvas.setWidth(oImg.width * scale);
                                fabricCanvas.setHeight(oImg.height * scale);
                                fabricCanvas.setBackgroundImage(oImg, fabricCanvas.renderAll.bind(fabricCanvas));
                            });
                        });

                        document.getElementById('add-arrow').addEventListener('click', function() {
                            const arrow = new fabric.Path('M 0 0 L 0 4 L 2 4 L 2 8 L 8 2 L 2 -4 L 2 0 Z', {
                                left: 100,
                                top: 100,
                                fill: 'red',
                                scaleX: 5,
                                scaleY: 5,
                                originX: 'center',
                                originY: 'center'
                            });
                            fabricCanvas.add(arrow);
                        });

                        document.getElementById('add-text').addEventListener('click', function() {
                            const text = new fabric.Textbox('Enter text here', {
                                left: 100,
                                top: 200,
                                width: 200,
                                fontSize: 20,
                                borderColor: 'red',
                                cornerColor: 'green',
                                cornerSize: 6,
                                transparentCorners: false,
                                editingBorderColor: 'blue'
                            });
                            fabricCanvas.add(text).setActiveObject(text);
                        });

                        document.getElementById('delete-item').addEventListener('click', function() {
                            const activeObject = fabricCanvas.getActiveObject();
                            if (activeObject) {
                                fabricCanvas.remove(activeObject);
                            }
                        });

                        document.getElementById('save-annotations').addEventListener('click', function() {
                            const modal = document.getElementById('annotation-modal');
                            const img = document.getElementById('screenshot');
                            img.src = fabricCanvas.toDataURL({
                                format: 'png',
                                quality: 0.8
                            });
                            modal.classList.remove('open');
                        });

                        document.getElementById('send-report').addEventListener('click', function() {
                            const screenshot = document.getElementById('screenshot').src;
                            const description = document.getElementById('description').value;

                            const formData = new FormData();
                            formData.append('description', description);
                            formData.append('screenshot', screenshot);

                            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json'
                                },
                                body: formData
                            })
                            .then(response => response.json())
                            .then(data => {
                                alert('Bug report sent successfully!');
                                const bugReport = document.getElementById('bug-report');
                                const bugReportTab = document.getElementById('bug-report-tab');
                                bugReport.classList.remove('open');
                                bugReportTab.style.display = 'block';
                            })
                            .catch(error => console.error('Error sending bug report:', error));
                        });
                    </script>
                </body>
                </html>
                `
                // Create a new div element and set its innerHTML to the HTML content and CSS
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    //container.innerHTML = htmlContent + cssContent;
    // Append the content to the document's body
    document.body.appendChild(container);
}        

                createBugTracker();
