<?php

Class Router{
    private $routes = [];

    public function addRoute(string $method, string $path, string $callback){
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'callback' => $callback
        ];
    }

    public function dispatch(string $requestMethod, string $requestUri){
        $uri = parse_url($requestUri, PHP_URL_PATH);

        foreach($this->routes as $route){
            if($route['method'] === $requestMethod){
                $pattern = preg_replace('#\{[\w]+\}#', '([\w=]+)', $route['path']);
                $pattern = "#^" . $pattern . "$#";
                if(preg_match($pattern, $uri, $matches)){
                    array_shift($matches);
                    $callback = $route['callback'];

                    [$class, $methodName] =  explode('@', $callback);
                    if(class_exists($class) && method_exists($class, $methodName)){
                        $controller = new $class();
                        return $controller->$methodName(...$matches);
                    }    
                }
            }

            
        }

        ErrorHelper::notFound();
    }

    public function get($uri, $controller)
    {
        $this->addRoute('GET', $uri, $controller);
    }

    public function post($uri, $controller)
    {
        $this->addRoute('POST', $uri, $controller);
    }

    public function put($uri, $controller)
    {
        $this->addRoute('PUT', $uri, $controller);
    }
}