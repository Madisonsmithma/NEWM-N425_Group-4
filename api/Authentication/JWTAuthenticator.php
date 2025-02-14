<?php




/**
 * 
 * Author: Gabriel Dennett
 * Date: 06/04/2023
 */


 namespace McDonaldsAPI\Authentication;

 use Slim\Psr7\Response;
 use Psr\Http\Message\ServerRequestInterface as Request;
 use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
 use McDonaldsAPI\Models\User;


 class JWTAuthenticator {
    public function __invoke(Request $request, RequestHandler $handler) : Response {
        if(!$request->hasHeader('Authorization')) {
            $results = ['Status' => 'Authorization header not available'];
            return AuthenticationHelper::withJson($results, 401);
        }

        $auth = $request->getHeader('Authorization');
        list(, $token) = explode(" ", $auth[0], 2);

        if(!User::validateJWT($token)) {
            $results = ['Status' => 'Authentication failed.'];
            return AuthenticationHelper::withJson($results, 403);
        }

        return $handler->handle($request);
    }
}