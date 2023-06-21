<?php
/**
 * Author: Josh Tuffnell
 * Date: 5/25/23
 * File: MenuItemIngredientController.php
 * Description: file to control menuitemingredient model
 */
namespace McDonaldsAPI\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use McDonaldsAPI\Models\NutritionalInformation;
use McDonaldsAPI\Controllers\ControllerHelper as Helper;
class NutritionalInformationController {
    //list all items
    public function index(Request $request, Response $response, array $args) : Response {
        $params = $request->getQueryParams();
        $term = array_key_exists('a', $params) ? $params['a'] : "";

<<<<<<< Updated upstream
        $results = ($term) ? NutritionalInformation::searchData($term) : NutritionalInformation::getData($request);
=======
        $results = ($term) ? NutritionalInformation::searchData($term) : NutritionalInformation::getData();
>>>>>>> Stashed changes
        return Helper::withJson($response, $results, 200);
    }
    //view a specific item
    public function view(Request $request, Response $response, array $args) : Response {
        $results = NutritionalInformation::getDataById($args['element']);
        return Helper::withJson($response, $results, 200);
    }

}