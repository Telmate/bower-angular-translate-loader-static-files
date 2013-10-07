angular.module('pascalprecht.translate')
.factory('$translateStaticFilesCache', [
  '$cacheFactory',
  function($cacheFactory) {
    return $cacheFactory('translateStaticFiles');
  }
])
.factory('$translateStaticFilesLoader', [
  '$q',
  '$http',
  '$translateStaticFilesCache',
  function ($q, $http, $translateStaticFilesCache) {
    return function (options) {
      if (!options || (!options.prefix || !options.suffix)) {
        throw new Error('Couldn\'t load static files, no prefix or suffix specified!');
      }
      var deferred = $q.defer();
      $http({
        url: [
          options.prefix,
          options.key,
          options.suffix
        ].join(''),
        method: 'GET',
        params: '',
        cache: $translateStaticFilesCache
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(options.key);
      });
      return deferred.promise;
    };
  }
]);