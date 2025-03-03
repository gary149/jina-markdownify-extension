// Function to markdownify the current page
function markdownifyPage(tab) {
  // Show processing toast
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
        // Remove any existing toast containers
        document
          .querySelectorAll(".markdownify-toast-container")
          .forEach((el) => el.remove());
          
        // Create container for shadow DOM
        const container = document.createElement("div");
        container.className = "markdownify-toast-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.zIndex = "2147483647"; // Maximum z-index
        
        // Create shadow DOM
        const shadow = container.attachShadow({ mode: "closed" });
        
        // Add styles to shadow DOM
        const style = document.createElement("style");
        style.textContent = `
          .toast {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            font-size: 14px;
            line-height: 1.5;
            box-sizing: border-box;
          }
          .spinner {
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            animation: spin 1s linear infinite;
            margin-right: 10px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        shadow.appendChild(style);
        
        // Create toast inside shadow DOM
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = '<div class="spinner"></div> Processing...';
        shadow.appendChild(toast);
        
        document.body.appendChild(container);
      },
    });

    // Get the current URL
    chrome.tabs.get(tab.id, (tabInfo) => {
      const currentUrl = tabInfo.url;
      const fetchUrl = `https://r.jina.ai/${encodeURIComponent(currentUrl)}`;

      // Fetch content from the constructed URL
      fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((content) => {
        // Inject a script to handle clipboard and toast
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (content) => {
            // Remove any existing toast containers
            document
              .querySelectorAll(".markdownify-toast-container")
              .forEach((el) => el.remove());

            // Copy content to clipboard
            navigator.clipboard
              .writeText(content)
              .then(() => {
                // Create container for shadow DOM
                const container = document.createElement("div");
                container.className = "markdownify-toast-container";
                container.style.position = "fixed";
                container.style.bottom = "20px";
                container.style.left = "50%";
                container.style.transform = "translateX(-50%)";
                container.style.zIndex = "2147483647"; // Maximum z-index
                
                // Create shadow DOM
                const shadow = container.attachShadow({ mode: "closed" });
                
                // Add styles to shadow DOM
                const style = document.createElement("style");
                style.textContent = `
                  .toast {
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    font-size: 14px;
                    line-height: 1.5;
                    box-sizing: border-box;
                  }
                `;
                shadow.appendChild(style);
                
                // Create toast inside shadow DOM
                const toast = document.createElement("div");
                toast.className = "toast";
                toast.textContent = "✅ Markdown copied to clipboard";
                shadow.appendChild(toast);
                
                document.body.appendChild(container);

                // Remove the container after 3 seconds
                setTimeout(() => {
                  container.remove();
                }, 3000);
              })
              .catch((err) => {
                console.error("Failed to copy to clipboard:", err);
              });
          },
          args: [content],
        });
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        // Show an error toast
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            // Remove any existing toast containers
            document
              .querySelectorAll(".markdownify-toast-container")
              .forEach((el) => el.remove());
              
            // Create container for shadow DOM
            const container = document.createElement("div");
            container.className = "markdownify-toast-container";
            container.style.position = "fixed";
            container.style.bottom = "20px";
            container.style.left = "50%";
            container.style.transform = "translateX(-50%)";
            container.style.zIndex = "2147483647"; // Maximum z-index
            
            // Create shadow DOM
            const shadow = container.attachShadow({ mode: "closed" });
            
            // Add styles to shadow DOM
            const style = document.createElement("style");
            style.textContent = `
              .toast {
                background-color: rgba(255, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                font-size: 14px;
                line-height: 1.5;
                box-sizing: border-box;
              }
            `;
            shadow.appendChild(style);
            
            // Create toast inside shadow DOM
            const toast = document.createElement("div");
            toast.className = "toast";
            toast.textContent = "Failed to fetch content";
            shadow.appendChild(toast);
            
            document.body.appendChild(container);
            
            setTimeout(() => {
              container.remove();
            }, 3000);
          },
        });
      });
    });
}

// Create the context menu item
chrome.contextMenus.create({
  id: "markdownify",
  title: "Markdownify with Jina Reader",
  contexts: ["page"],
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "markdownify") {
    markdownifyPage(tab);
  }
});

// Listen for toolbar icon clicks
chrome.action.onClicked.addListener((tab) => {
  markdownifyPage(tab);
});
